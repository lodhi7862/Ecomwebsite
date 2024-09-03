document.addEventListener('DOMContentLoaded', () => {
  const db = firebase.firestore();
  const auth = firebase.auth();

  const addProductForm = document.getElementById('add-product-form');
  const productsTable = document.getElementById('products-table').getElementsByTagName('tbody')[0];

  auth.onAuthStateChanged(user => {
      if (user) {
          user.getIdTokenResult().then(idTokenResult => {
              if (idTokenResult.claims.admin) {
                  loadProducts();
              } else {
                  window.location.href = '/index.html';
              }
          });
      } else {
          window.location.href = '/login.html';
      }
  });

  addProductForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const productName = document.getElementById('productName').value;
      const productPrice = document.getElementById('productPrice').value;
      const productDescription = document.getElementById('productDescription').value;

      db.collection('products').add({
          name: productName,
          price: productPrice,
          description: productDescription
      }).then(() => {
          addProductForm.reset();
          loadProducts();
      }).catch(error => {
          console.error('Error adding product: ', error);
      });
  });

  function loadProducts() {
      productsTable.innerHTML = '';
      db.collection('products').get().then(snapshot => {
          snapshot.forEach(doc => {
              const product = doc.data();
              const row = productsTable.insertRow();
              row.insertCell(0).textContent = doc.id;
              row.insertCell(1).textContent = product.name;
              row.insertCell(2).textContent = product.price;
              row.insertCell(3).textContent = product.description;
              const actionsCell = row.insertCell(4);
              const deleteButton = document.createElement('button');
              deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
              deleteButton.textContent = 'Delete';
              deleteButton.onclick = () => deleteProduct(doc.id);
              actionsCell.appendChild(deleteButton);
          });
      }).catch(error => {
          console.error('Error loading products: ', error);
      });
  }

  function deleteProduct(productId) {
      db.collection('products').doc(productId).delete().then(() => {
          loadProducts();
      }).catch(error => {
          console.error('Error deleting product: ', error);
      });
  }
});

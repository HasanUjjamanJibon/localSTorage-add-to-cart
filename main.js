const cardSection = document.getElementById("card-section");
let productsData = [];

const loadData = async () => {
  const res = await fetch("./data.json");
  const data = await res.json();
  displayAllItem(data);
};

const displayAllItem = (items) => {
  //   console.log(items);
  items.forEach(({ category, description, image, name, price, id }) => {
    cardSection.innerHTML += `
    <div class="card card-compact w-full bg-base-100 shadow-xl">
    <figure><img src=${image} class="h-96" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${name}</h2>
      <h2 class="card-title">${category}</h2>
      <p>${description.slice(0, 150)}</p>
      <div class="card-actions justify-end">
      <button onclick="removeCart('${id}')" class="btn btn-primary">Remove Cart</button>
        <button onclick="addToCart('${id}', '${name}', '${price}' )" class="btn btn-primary">Add To Cart</button>
      </div>
    </div>
  </div>
    `;
  });
};

// Product added
const addToCart = (id, name, price) => {
  const privousItem = JSON.parse(localStorage.getItem("products"));
  const product = {
    id,
    name,
    price,
    bookmark: true,
  };
  if (privousItem) {
    const isCartAdded = privousItem.find((pd) => pd.id == id);
    if (isCartAdded) {
      swal({
        icon: "error",
        title: `Already Added ${name}`,
      });
    } else {
      productsData.push(product);
      localStorage.setItem("products", JSON.stringify(productsData));
      swal({
        icon: "success",
        title: `Successfully Added  ${name}`,
      });
    }
  } else {
    productsData.push(product);
    localStorage.setItem("products", JSON.stringify(productsData));
    swal({
      icon: "success",
      title: `Successfully Added  ${name}`,
    });
  }
};

// Product remove
const removeCart = (id) => {
  const previousItem = JSON.parse(localStorage.getItem("products"));
  const restOfItem = previousItem.filter((pd) => pd.id != id);
  localStorage.setItem("products", JSON.stringify(restOfItem));
  console.log(restOfItem);
};

loadData();

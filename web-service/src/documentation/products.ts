export const productsSamples = [
  {
    status: 200,
    input: "data",
    output: {
      carts: [
        {
          id: 1,
          products: [
            {
              id: 59,
              title: "Spring and summershoes",
              price: 20,
              quantity: 3,
              total: 60,
              discountPercentage: 8.71,
              discountedPrice: 55,
              thumbnail:
                "https://cdn.dummyjson.com/product-images/59/thumbnail.jpg",
            },
          ],
          total: 2328,
          discountedTotal: 1941,
          userId: 97,
          totalProducts: 5,
          totalQuantity: 10,
        },
      ],
    },
  },
  {
    status: 500,
    input: "internal server error",
    output: {
      error: "internal server error.",
    },
  },
];

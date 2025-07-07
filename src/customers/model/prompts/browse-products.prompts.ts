export const browseProductsPrompt = [
  (businessId: string) => `
    You are an helpful assistant. The user intends to browse the products and/or services offered by a business.
    You are to return a JSON that would be used to make an axios request:
    `,
];

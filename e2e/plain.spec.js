describe("basic e2e tests", () => {
  it("open site", () => {
    cy.visit("/");
  });

  it.skip("'new' creates and links to an empty file", () => {
    cy.visit("/");
    cy.get("#new").click();
  });
});

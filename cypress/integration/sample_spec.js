describe("Home page", () => {
	it("Navbar element displays title of site and essential navigation links", () => {
		cy.visit("http://localhost:9090/");
		cy.get(".navbar").contains("Bamboo");
		cy.get(".navbar").contains("Home");
		cy.get(".navbar").contains("Blogs");
	});

	describe("Essential navigation links redirect correctly", () => {
		it("Blogs on navbar should work correctly", () => {
			cy.visit("http://localhost:9090/");
			cy.contains("Blogs").click();
			cy.url().should("include", "/blogs");
		});
		it("Home on navbar should work correctly", () => {
			cy.visit("http://localhost:9090/blogs");
			cy.contains("Home").click();
			cy.url().should("include", "/");
		});
	});
});
// describe("Blogs page", () => {
// 	it("check if blog cards are displayed", () => {
// 		cy.visit("http://localhost:9090/blogs");
// 		// cy.get(".card_list > li").should("have.class", "card");
// 		// cy.get("#1 h5:first").contains("IDC");
// 		// cy.get(".card-body > a").should("have.class", "card-link");
// 	});
// 	it("check if blog cards read more links are correct", () => {
// 		cy.visit("http://localhost:9090/blogs");
// 		cy.get("#1 a:first").should("have.attr", "href", "/blogs/1");
// 	});
// });

describe("calculator test", () => {
  const clickDigit = (digit) => cy.get(".digit").contains(digit).click();
  const clickAC = () => cy.get(".modifier").contains("AC").click();
  const clickOperation = (operation) =>
    cy.get(".operation").contains(operation).click();
  const getTotal = () => cy.get("#total");

  beforeEach(() => {
    cy.visit("/index.html");
  });

  describe("더하기 테스트", () => {
    it("7 + 5", () => {
      clickDigit("7");
      clickOperation("+");
      clickDigit("5");
      clickOperation("=");
      getTotal().should("have.text", "12");
    });
  });

  describe("리셋 테스트", () => {
    it("reset", () => {
      clickDigit("9");
      clickOperation("+");
      clickDigit("9");
      clickOperation("=");
      clickAC();
      getTotal().should("have.text", "0");
    });
  });
});

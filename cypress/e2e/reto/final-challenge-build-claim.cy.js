describe('Final Challenge Build Claim', () => {
	it('Build Claim', () => {
		cy.login('Admin', 'admin123');

		cy.navigate_to_create_claim_request();

		cy.create_claim_request({
			employee_name: 'Cecil',
			event: 'Medical',
			currency: 'Mexican Peso',
			remarks: 'Observaciones del cliente'
		});

		cy.add_expense({
			expense_type: 'Transport',
			date: '2023-12-09',
			amount: '3215',
			notes: 'esto es una prueba'
		});

		cy.attach_file({
			file_path: 'cypress/fixtures/captura.png',
			comments: 'comentarios adicionales'
		});

		cy.confirm_claim();
	});
});

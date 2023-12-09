Cypress.Commands.add('login', (username, password) => {
	cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
	cy.get('input[name="username"]').type(username);
	cy.get('input[name="password"]').type(password);
	cy.get('button[type="submit"]').click();
	cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('navigate_to_create_claim_request', () => {
	cy.get('a').contains('Claim').click();
	cy.get('button').contains('Assign Claim').click();
	cy.url().should('include', '/claim/assignClaim');
});

Cypress.Commands.add('create_claim_request', ({ employee_name, event, currency, remarks }) => {
	const form_rows = 'form[data-v-d5bfe35b] > div[data-v-2130bd2a]';
	const input_employee_name = 'input[data-v-75e744cd]';
	const input_employees_options = 'div[data-v-3ebc98ba] > div';
	const combos = 'div.oxd-select-wrapper[data-v-13cf171c]';
	const combo_options = 'div[data-v-40acfd38] > div';
	const submit_button = 'button[type="submit"][data-v-10d463b7]';

	cy.get(form_rows).eq(0).find(input_employee_name).type(employee_name);
	cy.get(form_rows).eq(0).find(input_employees_options).contains(employee_name).click();

	cy.get(form_rows).eq(1).find(combos).eq(0).click();
	cy.get(form_rows).eq(1).find(combo_options).contains(event).click();

	cy.get(form_rows).eq(1).find(combos).eq(1).click();
	cy.get(form_rows).eq(1).find(combo_options).contains(currency).click();

	cy.get(form_rows).eq(2).find('textarea').type(remarks);

	cy.get(submit_button).click();

	cy.contains('Successfully Saved').should('be.visible');
});

Cypress.Commands.add('add_expense', ({ expense_type, date, amount, notes }) => {
	const add_expense_button = 'button[type="button"][data-v-10d463b7][data-v-0faf90dd]';
	const modal_expense = 'div[data-v-8a31f039][data-v-126e9e0f]';
	const form_rows = `${modal_expense} > form.oxd-form[data-v-d5bfe35b] > div[data-v-2130bd2a]`;

	const combo_expense_type = 'div.oxd-select-text[data-v-67d2aedf][data-v-13cf171c]';
	const combo_expense_type_options = 'div[data-v-40acfd38][data-v-13cf171c]';
	const input_date = 'input[data-v-1f99f73c][data-v-4a95a2e0]';
	const input_amount = 'input[data-v-1f99f73c]';

	const save_expense_button = 'button[type="submit"][data-v-10d463b7]';

	cy.get(add_expense_button).click();

	cy.get(form_rows).eq(0).find(combo_expense_type).click();
	cy.get(form_rows).eq(0).find(combo_expense_type_options).contains(expense_type).click();

	cy.get(form_rows).eq(1).find(input_date).type(date);
	cy.get(form_rows).eq(1).find(input_amount).eq(1).type(amount);

	cy.get(form_rows).eq(2).find('textarea').type(notes);

	cy.get(`${modal_expense}`).find(save_expense_button).click();

	cy.contains('Successfully Saved').should('be.visible');
});

Cypress.Commands.add('attach_file', ({ file_path, comments }) => {
	const attach_file_button = 'button[type="button"][data-v-10d463b7][data-v-7b777c86]';

	const modal_file = 'div[data-v-8a31f039][data-v-126e9e0f]';
	const form_rows = `${modal_file} > form.oxd-form[data-v-d5bfe35b] > div[data-v-2130bd2a]`;

	const file_input = 'input[type="file"][data-v-1b0f05a0]';

	const save_file_button = 'button[type="submit"][data-v-10d463b7]';

	cy.get(attach_file_button).click();

	cy.get(form_rows).eq(0).find(file_input).selectFile(file_path, { force: true });

	cy.get(form_rows).eq(1).find('textarea').type(comments);

	cy.get(`${modal_file}`).find(save_file_button).click();

	cy.contains('Successfully Saved').should('be.visible');

	cy.wait(3000);
});

Cypress.Commands.add('confirm_claim', () => {
	const attach_file_button = 'button[type="button"][data-v-10d463b7][data-v-b9594af4]';

	cy.get(attach_file_button).contains('Submit').click();

	cy.contains('Successfully Saved').should('be.visible');
});
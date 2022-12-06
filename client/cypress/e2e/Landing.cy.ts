import { trendingSearches } from '../fixtures';

describe('Landing page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/user/isloggedin', 'false').as('isLoggedIn');
  });

  it('renders the landing page', () => {
    cy.visit('/');

    cy.findByRole('heading', { name: /Track in demand skills in your area/ }).should('exist');
    cy.findByRole('heading', { name: /Try it out for free!/ }).should('exist');
  });

  it('renders trending searches if the network response returns searches', () => {
    cy.intercept('GET', '/api/job/search/trending', trendingSearches).as('trending');

    cy.visit('/');

    cy.findByText('💎 Node').should('exist');
    cy.findByText('💎 Python').should('exist');
    cy.findByText('💎 Node • React SQL').should('exist');
  });

  it('nav bar links work', () => {
    cy.visit('/');

    cy.findByRole('link', { name: 'Home' }).click();
    cy.url().should('equal', 'http://localhost:3000/');

    cy.findByRole('link', { name: 'Login' }).click();
    cy.url().should('equal', 'http://localhost:3000/login');

    cy.findByRole('link', { name: 'Sign me up!' }).click();
    cy.url().should('equal', 'http://localhost:3000/login');
  });

  it.only('allows users to "try out" the search functionality', () => {
    cy.visit('/');

    cy.findByRole('heading', { name: /Track in demand skills in your area/ }).should('exist');
    cy.findByLabelText('Location').click();
    cy.findByRole('option', { name: 'London' }).click();
  });
});


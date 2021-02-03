import styled from 'styled-components';
import homeHeroImg from '../images/xps-dpbXgTh0Lac-unsplash.jpg';

export const BackgroundImageContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.device === 'mobile' ? '120vh' : '90vh')};
  min-height: 500px;
  background-image: url(${homeHeroImg});
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  padding: var(--primary-pad) 0;
`;

export const SearchInstructions = styled.article`
  color: var(--secondary-color);
  text-shadow: 2px 2px var(--primary-color);
  padding: 0 var(--primary-pad);
  max-width: 700px;
  margin: 0 auto;

  & p {
    color: var(--secondary-color);
    font-size: 1.2rem;
  }
`;

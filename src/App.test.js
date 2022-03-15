import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from './App';


jest.mock('axios')

beforeEach(() => {
  render(<App />);
  axios.get.mockClear();
})

const fillFormAndSubmit = () => {
  const inputEl = screen.getByLabelText(/word/i);
  const btnEl = screen.getByRole('button',{name: /consult/i})

  fireEvent.change(inputEl, {target: { value: 'desktop'}});
  fireEvent.click(btnEl);
}

test('renders Free Dictionary title', () => {
  
  const title = screen.getByText(/free dictionary/i);
  expect(title).toBeInTheDocument();
});

test ('should renders the forms elements',()=>{
 
  const inputEl = screen.getByLabelText(/word/i);
  const btnEl = screen.getByRole('button',{name: /consult/i})
  
  expect(inputEl).toBeInTheDocument();
  expect(btnEl).toBeInTheDocument();

});

test ('should search a word', async() => {

  const expectedDefinition= 'The top surface of a desk';
  axios.get.mockReturnValueOnce({
    data: [{
      meanings: [{
        definitions:[{
          definition: expectedDefinition
        }]
      }]
    }]
  })
  
  fillFormAndSubmit();

  const wordMeaningEl = await screen.findByText(expectedDefinition)

  expect(wordMeaningEl).toBeInTheDocument();
});

test ('should not exist Loading string when search is finish', async () => {
  const expectedDefinition= 'The top surface of a desk';

  axios.get.mockReturnValueOnce({
    data: [{
      meanings: [{
        definitions:[{
          definition: expectedDefinition
        }]
      }]
    }]
  })

  fillFormAndSubmit()

  const loadingEl = screen.getByText(/loading/i)

  expect(loadingEl).toBeInTheDocument()
  const wordMeaningEl = await screen.findByText(expectedDefinition)

  const loadingExpectedEl=screen.queryByText(/loading/i)
  expect(loadingExpectedEl).not.toBeInTheDocument()
})
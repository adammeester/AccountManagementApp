import logo from './logo.svg';
import './App.css';
import SelectorContainer from './components/selector-container';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/Theme';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <ThemeProvider theme={theme}>
        <SelectorContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;

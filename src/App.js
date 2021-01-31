import { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import MainHeader from './components/MainHeader';
import NewEntryForm from './components/NewEntryForm';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import EntryLines from './components/EntryLines';
import ModalEdit from './components/ModalEdit';
import { useSelector } from 'react-redux';

function App() {

  const [incomeTotal, setIncomeTotal] = useState(0.0);
  const [expenseTotal, setExpenseTotal] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  const {isOpen,id} = useSelector((state) => state.modals);
  const entries = useSelector((state) => state.entries);


  const [entry, setEntry] = useState();

  useEffect(() => {
    const index = entries.findIndex(entry => entry.id === id);
    setEntry(entries[index]);

  }, [isOpen, id, entries]);

  useEffect( () => {

    let totalIncomes = 0.0;
    let totalExpense = 0.0;

    entries.map( (entry) => {
      
      if(entry.isExpense) {
        return (totalExpense += Number(entry.value));
      }       
      return (totalIncomes += Number(entry.value));
      
    });

    setIncomeTotal(totalIncomes);
    setExpenseTotal(totalExpense);
    setTotal(Number(totalIncomes - totalExpense));

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);



  return (
    
    <Container>
      <MainHeader title="Jim's Budget" />
      <DisplayBalance title="Your Balance" value={total} />  

      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal} />

      <MainHeader title="History" type="h3" />
      <EntryLines entries={entries} />
     
      <MainHeader title="Add New Transaction" type="h3" />

      <NewEntryForm />
      <ModalEdit isOpen={isOpen} {...entry} />
    </Container>

  );
}

export default App;

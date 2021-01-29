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

 //const initialEntries = [{}];

  //const [entries, setEntries] = useState(initialEntries);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [entryId, setEntryId] = useState();

  const [incomeTotal, setIncomeTotal] = useState(0.0);
  const [expenseTotal, setExpenseTotal] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  const entries = useSelector(state => state.entries);

  const resetForm = () => {
    //reset
    setDescription('');
    setValue('');
    setIsExpense(true);
  }

  useEffect(() => {
    if(!isOpen && entryId) {
      const index = entries.findIndex(entry => entry.id === entryId);
      const newEntries = [...entries];
      newEntries[index].description = description;
      newEntries[index].value = Number(value);
      newEntries[index].isExpense = isExpense;
      // setEntries(newEntries);
      resetForm();
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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

  const editEntry = (id) => {

    console.log(`edit entry with id : ${id}`);
    if(id) {
      const index = entries.findIndex(entry => entry.id === id );
      const entry = entries[index];
      setEntryId(id);
      setDescription(entry.description);
      setValue(Number(entry.value));
      setIsExpense(entry.isExpense);
      setIsOpen(true);
    }

  }

  const addEntry = () => {
    const result = entries.concat({id:entries.length +1, description, value, isExpense});
    // setEntries(result);
    resetForm();
  }

  return (
    
    <Container>
      <MainHeader title="Jim's Budget" />
      <DisplayBalance title="Your Balance" value={total} />  

      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal} />

      <MainHeader title="History" type="h3" />
      <EntryLines entries={entries} editEntry={editEntry} />
     
      <MainHeader title="Add New Transaction" type="h3" />

      <NewEntryForm addEntry={addEntry}
        description={description} value={value} isExpense={isExpense} 
        setValue={setValue} setDescription={setDescription} setIsExpense={setIsExpense} />
      <ModalEdit isOpen={isOpen} setIsOpen={setIsOpen} 
        addEntry={addEntry}
        description={description} value={value} isExpense={isExpense} 
        setValue={setValue} setDescription={setDescription} setIsExpense={setIsExpense} />
    </Container>

  );
}

export default App;

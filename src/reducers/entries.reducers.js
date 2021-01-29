// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialEntries, action) => {

    let newEntries;
    switch( action.type ) {
      
      case 'ADD_ENTRY':
        newEntries = state.concat({...action.payload});
        return newEntries;

      case 'REMOVE_ENTRY':
        
        newEntries = state.filter(entry => entry.id !== action.payload.id);
        return newEntries;

      default:
        return state;
    }
    
};

var initialEntries = [
    {
      id: 1,
      description: "Work Income By Slave Labor",
      value: Number(1500.00),
      isExpense: false
    },
    {
      id: 2,
      description: "Electric Bill",
      value: Number(200.35),
      isExpense: true
    },
    {
      id: 3,
      description: "Check from Dad",
      value: Number(1200.00),
      isExpense: false
    },
    {
      id: 4,
      description: "Rent",
      value: Number(900.00),
      isExpense: true
    },
    {
      id: 5,
      description: "Phone Bill",
      value: Number(198.57),
      isExpense: true
    },
    {
      id: 6,
      description: "Visa",
      value: Number(150.65),
      isExpense: true
    }
  ];
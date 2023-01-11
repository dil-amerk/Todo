import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store} from './redux/store';


const App = () => {
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(getTodos())
  // }, [])

  return (
    <Provider store={store}>
     
    </Provider>
  );
};

export default App;

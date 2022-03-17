import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

// const MOCKED_USERS = [
//     {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
//     {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
// ]
// const MOCKED_USERS = [
//   "alice", "bob", "charlie"
// ];

// const MOCKED_TUITS = [
//   "alice's tuit", "bob's tuit", "charlie's tuit"
// ];

const MOCKED_TUITS = [
  {tuit: "alice's tuit", _id: "123"},
  {tuit: "bob's tuit", _id: "234"},
  {tuit: "charlie's tuit", _id: "345"}
];

test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;
  
    render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);
  
    const tuit = screen.getByText(/bob/i);
    expect(tuit).toBeInTheDocument();
});
  
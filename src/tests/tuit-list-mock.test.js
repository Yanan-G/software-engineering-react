import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  {username: "alice", _id: "1"},
  {username: "bob", _id: "2"},
  {username: "charlie", _id: "3"}
];

const MOCKED_TUITS = [
  {tuit: "alice's tuit", _id: "123", postedBy: MOCKED_USERS[0]},
  {tuit: "bob's tuit", _id: "234", postedBy: MOCKED_USERS[1]},
  {tuit: "charlie's tuit", _id: "345", postedBy: MOCKED_USERS[2]}
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
  
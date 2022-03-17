import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import Tuits from "../components/tuits/index";

// const MOCKED_USERS = [
//   "alice", "bob", "charlie"
// ];
const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "1"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "2"},
]
const MOCKED_TUITS = [
  {tuit: "alice's tuit", _id: "123", postedBy: "1"},
  {tuit: "bob's tuit", _id: "234", postedBy: "2"},
  {tuit: "charlie's tuit", _id: "345", postedBy: "1"}
];

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS}/>
    </HashRouter>);
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>);
  const linkElement = screen.getByText(/second/i);
  expect(linkElement).toBeInTheDocument();
  // create mocked users then use these ids to create mocked tuits
})

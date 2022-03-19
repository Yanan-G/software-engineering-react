import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import Tuits from "../components/tuits/index";

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
})

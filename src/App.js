import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import RoleAuth from "./functionalities/RoleAuth";
import SignUp from "./components/SignUp";
import BikesList from "./components/BikesList";
import ManageBikes from "./components/ManageBikes";
import ReserveBikes from "./components/ReserveBikes";
import NoDataFound from "./components/NoDataFound";
import AddUser from "./components/AddUser";
import AddBike from "./components/AddBike";
import AllBikesInReservation from "./components/AllBikesInReservation";
import AllUsersInReservation from "./components/AllUsersInReservation";
import BikeEdit from "./components/BikeEdit";
import UserEdit from "./components/UserEdit";
import ManageUsers from "./components/ManageUsers";
import UserReservations from "./components/UserReservations";
import Footer from "./components/Footer";
import BikeReserveList from "./components/BikeReserveList";
import ManagerReservations from "./components/ManagerReservations";
// json-server src/db.json -m ./node_modules/json-server-auth
function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/bike/page/:pageNum"
              element={
                <RoleAuth>
                  <BikesList />
                </RoleAuth>
              }
            />
            <Route
              path="/manage/users/:pageNum"
              element={
                <RoleAuth accessRole="MANAGER">
                  <ManageUsers />
                </RoleAuth>
              }
            />

            <Route
              path="/manage/bikes/:pageNum"
              element={
                <RoleAuth accessRole="MANAGER">
                  <ManageBikes />
                </RoleAuth>
              }
            />
            <Route
              path="/manage/users/:userId/edit"
              element={
                <RoleAuth accessRole="MANAGER">
                  <UserEdit />
                </RoleAuth>
              }
            />
            <Route
              path="/manage/bikes/:bikeId/edit"
              element={
                <RoleAuth accessRole="MANAGER">
                  <BikeEdit />
                </RoleAuth>
              }
            />
            <Route
              path="/bike/:bikeId"
              element={
                <RoleAuth>
                  <ReserveBikes />
                </RoleAuth>
              }
            />
            <Route
              path="/manage/:userId/myreservations"
              element={
                <RoleAuth accessRole="MANAGER">
                  <ManagerReservations />
                </RoleAuth>
              }
            />
            <Route
              path="/user/:userId/reservations"
              element={
                <RoleAuth>
                  <UserReservations />
                </RoleAuth>
              }
            />
            <Route
              path="/create/users"
              element={
                <RoleAuth accessRole="MANAGER">
                  <AddUser />
                </RoleAuth>
              }
            />
            <Route
              path="/create/bikes"
              element={
                <RoleAuth accessRole="MANAGER">
                  <AddBike />
                </RoleAuth>
              }
            />

            <Route
              path="/manage/:userId/reservations"
              element={
                <RoleAuth accessRole="MANAGER">
                  <ManageBikes />
                </RoleAuth>
              }
            />
            <Route
              path="/reservations/:bikeId/page/:pageNum"
              element={
                <RoleAuth accessRole="MANAGER">
                  <BikeReserveList />
                </RoleAuth>
              }
            />

            <Route
              path="/manage/reservations/user/page/:pageNum"
              element={
                <RoleAuth accessRole="MANAGER">
                  <AllUsersInReservation />
                </RoleAuth>
              }
            />
            <Route
              path="/manage/reservations/bikes/page/:pageNum"
              element={
                <RoleAuth accessRole="MANAGER">
                  <AllBikesInReservation />
                </RoleAuth>
              }
            />
            <Route path="*" element={<NoDataFound />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;

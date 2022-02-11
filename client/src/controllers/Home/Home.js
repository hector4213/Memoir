import React, { useEffect } from "react";
import "./Home.scss";

import { connect } from "react-redux";

import Header from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import LogInRegisterModal from "../../components/LogInRegister/LogInRegister";

import { getAllStoriesAction } from "../../redux/actions/story";
import { clearCurrentAction } from "../../redux/actions/page";

import ButtonsForHome from "../ButtonGroups/ButtonsForHome/ButtonsForHome";
import HomeCards from "./HomeCards";
import Searchbar from "../../components/Search/Search";

const Home = (props) => {
  const { getAllStories, clearCurrent } = props;
  const { modal, stories } = props;

  useEffect(() => {
    getAllStories();
    clearCurrent();
  }, [clearCurrent, getAllStories]);

  return (
    <div className="home">
      {modal ? (
        <Modal>
          {" "}
          <LogInRegisterModal />{" "}
        </Modal>
      ) : (
        ""
      )}
      <ButtonsForHome />
      <Header />
      <Searchbar />
      <HomeCards stories={stories} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modal: state.page.modal,
    stories: state.page.stories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllStories: () => dispatch(getAllStoriesAction()),
    clearCurrent: () => dispatch(clearCurrentAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

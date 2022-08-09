import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: row;
  min-width: 611px;
  width: 42%;
  height: 209px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
`;

const FormImage = styled.div`
  width: 14%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 16px;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const FormContent = styled.div`
  width: 86%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 21px;

  h1 {
    font-family: "Lato";
    font-weight: 300;
    font-size: 20px;
    color: #707070;
    text-align: left;
  }
`;

const PublishForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 145px;
  width: 96%;
  margin-top: 10px;

  input {
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: #efefef;
    box-sizing: border-box;
    line-height: 30px;
    color: #707070;
    font-family: "Lato";
    font-size: 15px;
    padding: 5px 0 5px 13px;
    margin-bottom: 5px;
  }

  & input:nth-child(2) {
    height: 66px;
    padding-bottom: 30px;
  }

  input::placeholder {
    color: #949494;
    opacity: 1;
    text-align: left;
  }

  button {
    display: flex;
    width: 112px;
    height: 31px;
    background-color: #1877f2;
    border: none;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    font-family: "Lato";
    font-size: 14px;
    color: #ffffff;

    cursor: pointer;
  }
`;

export { FormContainer, FormImage, FormContent, PublishForm };

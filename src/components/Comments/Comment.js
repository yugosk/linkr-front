import styled from "styled-components";

export default function Comment() {
  return (
    <Container>
      <img
        src="https://static.remove.bg/remove-bg-web/f9c9a2813e0321c04d66062f8cca92aedbefced7/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png"
        alt="Profile"
      />
      <div>
        <p>
          Pessoa
          <span>• post's author</span>
          <span>• following</span>
        </p>
        <p>Comment</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  gap: 14px;
  border-bottom: 1px solid #353535;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 4px;
    width: 100%;
  }

  p {
    width: 100%;
    font-family: "Lato";
    font-weight: 400;
    font-size: 14px;
    word-wrap: break-word;
  }

  p:nth-of-type(1) {
    color: #f3f3f3;
  }

  p:nth-of-type(2) {
    color: #acacac;
  }

  span {
    color: #565656;
  }
`;

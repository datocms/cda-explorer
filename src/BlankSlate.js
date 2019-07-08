import React from "react";

const BlankSlate = () => {
  return (
    <div className="intro">
      <div className="intro__inner">
        <div className="intro__title">Please insert your API token!</div>
        <div className="intro__description">
          To access the GraphQL API Explorer you need to specify your project's
          API token:
        </div>
        <form>
          <input
            className="intro__input"
            type="text"
            placeholder="Paste your API token here"
            name="apitoken"
          />
          <input type="submit" value="Submit" className="intro__button"/>
        </form>
      </div>
    </div>
  );
};

export default BlankSlate;

import React from 'react';
import HelloComponent from "./hello.component";

// contact route component
const HomeComponent = ( props ) => {
    return (
      <h1>Contact Component! <HelloComponent /></h1>
    );
}

export default HomeComponent;

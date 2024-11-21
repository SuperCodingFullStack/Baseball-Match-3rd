import React, { useEffect } from "react";
import styled from "styled-components";
import SignHeader from "./SignHeader";
import SignBody from "./SignBody";
import { useDispatch } from "react-redux";
import { activeIdActions } from "../../Store/Slice/ActiveIdSlice";
import { linkSection } from "./linkSection";

const SignWrapper = styled.div``;

const Signup = () => {
  const dispatch = useDispatch();

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        dispatch(activeIdActions.changeActive(entry.target.id));
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1,
    });

    linkSection.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
        element.scrollIntoView({ behavior: "smooth" });
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <SignWrapper>
      <SignHeader />
      <SignBody />
    </SignWrapper>
  );
};

export default Signup;

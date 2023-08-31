import { useNavigate } from "react-router-dom";
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        {/* <Link to={`shop/${title}`}> */}
          <h2>{title}</h2>
          <p>Shop Now</p>
        {/* </Link> */}
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;

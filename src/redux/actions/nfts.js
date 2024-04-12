import { GET_DATA, GET_SINGLE_NFT } from "./type";

const fetchData = async (url) => {
  const res = await fetch(`${url}`);
  const data = await res.json();
  return data;
};

export const getNfts = () => async (dispatch) => {
  dispatch({
    type: GET_DATA,
    payload: await fetchData("/static/nft.json"),
  });
};

export const getSingleNft = (id) => async (dispatch) => {
  const data = await fetchData("/static/nft.json");

  dispatch({
    type: GET_SINGLE_NFT,
    payload: data.find((data) => data.id === Number(id)),
  });
};

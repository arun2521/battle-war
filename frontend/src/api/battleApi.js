import axios from "axios";

const API_BASE = "http://localhost:3000";

export const getWinningResult = async (myPlatoons, enemyPlatoons) => {
  try {
    const res = await axios.post(`${API_BASE}/battle-plan`, {
      myPlatoons,
      enemyPlatoons,
    });
    return res.data;
  } catch (error) {
    return { error: error };
  }
};

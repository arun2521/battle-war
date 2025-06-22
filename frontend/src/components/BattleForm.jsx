import React, { useState } from "react";
import { getWinningResult } from "../api/battleApi";
import "./BattleForm.css";

const BattleForm = () => {
  const [allStates, setAllStates] = useState({
    myPlatoons: "",
    enemyPlatoons: "",
    result: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getWinningResult(
      allStates.myPlatoons,
      allStates.enemyPlatoons
    );
    setAllStates((prev) => ({
      ...prev,
      result: data,
    }));
  };

  return (
    <div className="battle_container">
      <h1 className="hdr_text">🛡️ Medieval Battle Planner</h1>

      <form onSubmit={handleSubmit} className="form_container">
        <div className="form_fields">
          <div className="form_field_div">
            <label style={{ paddingRight: "2.5rem" }}>Your Platoons:-</label>
            <input
              type="text"
              value={allStates.myPlatoons}
              onChange={(e) => {
                setAllStates((prev) => ({
                  ...prev,
                  myPlatoons: e.target.value,
                }));
              }}
              className="input_fields"
              placeholder="e.g. Spearmen#10;Militia#30;..."
              required
            />
          </div>

          <div className="form_field_div">
            <label className="font-semibold">Enemy Platoons:-</label>
            <input
              type="text"
              value={allStates.enemyPlatoons}
              onChange={(e) => {
                setAllStates((prev) => ({
                  ...prev,
                  enemyPlatoons: e.target.value,
                }));
              }}
              className="input_fields"
              placeholder="e.g. Militia#10;Spearmen#10;..."
              required
            />
          </div>

          <button type="submit" className="submit_btn">
            Simulate Battle
          </button>
        </div>
      </form>

      {allStates.result?.winningResult && (
        <p style={{ paddingLeft: "1.25rem" }}>
          Winning Result:-{" "}
          <span style={{ fontWeight: "bold" }}>
            {allStates.result?.winningResult?.winningResult}
          </span>
        </p>
      )}

      {allStates.result?.winningResult?.battleLogs.length > 0 ? (
        <div className="table_div">
          <table className="battle-table">
            <thead>
              <tr>
                <th>Battle</th>
                <th>Own Platoon</th>
                <th>Opponent Platoon</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {allStates.result.winningResult.battleLogs.map((battle, idx) => (
                <tr key={idx}>
                  <td>{battle.battle}</td>
                  <td>{battle.own}</td>
                  <td>{battle.enemy}</td>
                  <td
                    className={
                      battle.outcome === "win"
                        ? "outcome-win"
                        : battle.outcome === "lose"
                        ? "outcome-loss"
                        : "outcome-draw"
                    }
                  >
                    {battle.outcome === "win"
                      ? "✅ Win"
                      : battle.outcome === "lose"
                      ? "❌ Loss"
                      : "⚖️ Draw"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="error_mgs_div">
          <p>{allStates.result?.message}</p>
        </div>
      )}
    </div>
  );
};

export default BattleForm;

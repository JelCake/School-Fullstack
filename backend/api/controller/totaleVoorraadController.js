import {
  fetchKritiekVoorraad,
  fetchMeldingenAlert,
  getCurrentOrNextReqBatchId,
} from "#services/fetchDatabaseInfo";
import { closeSSESession } from "#services/SSEService";
import { processToken, validateToken } from "#services/tokenHandler";
import {
  HTTP_STATUS,
  REFRESH_RATES,
  VERIFY_INTERVAL,
} from "#utils/magicNumberFile";

//TODO TEST THIS, THIS MIGHT BE BUGGY
// ==========================================
// GET: TotaleVoorraad controller
// ==========================================
export const fetchDashboardDisplayData = async (req, res) => {
  res.writeHead(HTTP_STATUS.OK, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache", // Good for SSE
    Connection: "keep-alive",
  });

  let lastVerified = Date.now();

  //Create a SSE connection, meaning you have an open connection to sever
  const intervalId = setInterval(async () => {
    try {
      // 1. Periodic security check
      if (Date.now() - lastVerified > VERIFY_INTERVAL) {
        //checks if the cookie isn't expired
        const isActive = processToken(req.cookies?.token);

        if (!isActive.success) return closeSSESession(res, intervalId);

        const isValid = await validateToken(isActive.tokenInfo);

        if (!isValid.success) return closeSSESession(res, intervalId);

        lastVerified = Date.now();
      }

      //! This could be the cause for data nor being feteched
      // 2. Fetch data
      const [voorraadData, alertsData] = await Promise.all([
        fetchKritiekVoorraad(
          req.userAuthLevel,
          req.tokenInformation.userDepartmentName,
        ),
        fetchMeldingenAlert(
          req.userAuthLevel,
          req.tokenInformation.userDepartmentName,
        ),
      ]);

      // 3. Send to client
      if (!res.writableEnded) {
        res.write(`data: ${JSON.stringify({ voorraadData, alertsData })}\n\n`);
      }
    } catch (err) {
      console.error("Dashboard Stream Error:", err);
    }
  }, REFRESH_RATES.CRITICAL_VITALS);

  req.on("close", () => {
    console.log("Client closed connection. Clearing interval.");
    clearInterval(intervalId);
  });
};

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import config from "../../config";

function Management() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(config.routes.management.report);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default Management;

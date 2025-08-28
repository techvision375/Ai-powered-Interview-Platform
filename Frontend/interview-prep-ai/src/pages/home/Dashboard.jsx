import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import DashboardLayout from "../../componants/layouts/DashboardLayout.jsx";
import { API_PATHS } from "../../utils/apiPath.js";
import SummaryCard from "../../componants/Cards/SummaryCard.jsx";
// import { FaMonument } from "react-icons/fa6";
import moment from "moment";
import { Modal } from "../../componants/Loader/Modal.jsx";
import CreateSessionModal from "./CreateSessionModal.jsx";
import  DeleteAlertContent  from "../../componants/Loader/DeleteAlertContent.jsx";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreatModal, setOpenCreatModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAleat, setOpenDeleteAleart] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      const sessionList = response.data?.sessions || []; // <-- Access the correct key
      setSessions(Array.isArray(sessionList) ? sessionList : []);
    } catch (error) {
      console.log("error in fetching sessions at Dashboard", error);
    }
  };
  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

      toast.success("Session Deleted Successfully");
      setOpenDeleteAleart({
        open: false,
        data: null,
      });

      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0 ">
          {sessions && sessions.length > 0 ? (
            sessions.map((data, index) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsFocus={data?.topicsFocus || ""}
                experience={data?.experience || ""}
                questions={data?.questions?.length || "--"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).format("Do MMM YYYY")
                    : ""
                }
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() => setOpenDeleteAleart({ open: true, data })}
              />
            ))
          ) : (
            <p>No sessions available</p> // Optional fallback UI
          )}
        </div>
        <button
          className="h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20 "
          onClick={() => {
            setOpenCreatModal(true);
          }}
        >
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>
      </div>

      <Modal
        isOpen={openCreatModal}
        onClose={() => {
          setOpenCreatModal(false);
        }}
        hideHeader
      >
        <CreateSessionModal />
      </Modal>
      <Modal
        isOpen={openDeleteAleat?.open}
        onClose={() => {
          setOpenDeleteAleart({ open: false, data: null });
        }}
        title="Delete Alert"
      >
        <div className="w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session detail?"
            onDelete={() => deleteSession(openDeleteAleat.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;

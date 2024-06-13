import axios from "axios";

export const getActs = async () => {

    const res = await axios.get("http://172.20.10.2:4000/api/getActs")
    return res.data;
    
};

export const getEvents = async () => {

    const res = await axios.get("http://172.20.10.2:4000/api/getEvents")
    return res.data;
    
};

export const getGameCodes = async (amount) => {

  let data;

  await axios.get(`http://172.20.10.2:4000/api/getGameCodes/${amount}`)
    .then((res) => {
      data = res.data
    })
    .catch((res) => {
      data = []
    })
  ;

  return data;
}

export const getWinner = async (actEventId) => {
  console.log('Getting winner from frontend service', actEventId);
  

    const res = await axios.get(`http://172.20.10.2:4000/api/winningEvent/${actEventId}/new`)
    
    return res.data;
    
};

export const checkTie = async (actEventId) => {
  console.log('Getting winner from frontend service', actEventId);
  

    const res = await axios.get(`http://172.20.10.2:4000/api/vote/winner/id/${actEventId}`)
    
    return res.data;
    
};

export const getMiniGameWinnerEvent = async (option, actEventId) => {
  console.log('Getting winner from frontend service', option, actEventId);
  

    const res = await axios.get(`http://172.20.10.2:4000/api/actEvent/next/${actEventId}/${option}`)
    
    return res.data;
    
};

export const updateEvent = async (event) => {

    await axios.post("http://172.20.10.2:4000/api/updateEvent", event)
     
};

export const linkEvents = async (choice) => {
    try {
      const response = await axios.put("http://172.20.10.2:4000/api/LinkEvent/next", {

        actEventID: choice.actEventID,
        option: choice.option,
        nextEventID: choice.nextActEventID

      });

      return response.data;

    } catch (error) {

      console.error("Error linking events:", error);
      throw error;

    }
  };

export const createAct = async (actName, events) => {
    console.log('Creating act from frontend service', actName, events);

    const data = {
        actName: actName,
        events: events
    };

    try {
        const res = await axios.post("http://172.20.10.2:4000/api/createAct", data);
        return res.data;
    } catch (error) {
        console.error('Error occurred while creating act and events:', error);
        throw new Error('Failed to create act and events');
    }
};

export const addNewAdmin = async (newAdmin) => {

  try {

    await axios.post("http://172.20.10.2:4000/api/addNewAdmin", newAdmin)
      .then((res) => {
        if (res.status == 200) {

          console.log("User added.");

        } else {

          console.log("Hmmmm");

        }
      })
    ;

  } catch (error) {

    console.log(error);

  };
};

export const updateAdminUser = (user) => {

  try {
    
    axios.put("http://172.20.10.2:4000/api/updateAdmin", user);

  } catch (error) {
    
    console.log(error);

  };
};
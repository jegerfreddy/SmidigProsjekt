package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.ActEvent;
import loading.smidig.smidig.service.ActEventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/actEvent")
@CrossOrigin(origins = "http://localhost:5173")
public class ActEventController {

    private final ActEventService actEventService;
    

    @Autowired
    public ActEventController(ActEventService actEventService) {
        this.actEventService = actEventService;
    }

    //Logger
    private static final Logger logger = LoggerFactory.getLogger(ActEventController.class);

    //Get all act events
    @GetMapping("/all")
    public List<ActEvent> getActEvents() {
        logger.info("Fetching all act events");
        return actEventService.getActEvents();
    }

    //Get act event by ID
    @GetMapping("/id/{id}")
    public ActEvent getActEventById(@PathVariable Long id) {
        logger.info("Fetching act event by ID: " + id);
        return actEventService.getActEventById(id);
    }

    //Create act event
    @PostMapping("/new")
    public ActEvent createActEvent(@RequestBody ActEvent actEvent) {
        logger.info("Creating new act event - " + actEvent.getEventTitle());
        return actEventService.createActEvent(actEvent);
    }

    //Delete act event by ID
    @DeleteMapping("/delete/{id}")
    public void deleteActEvent(@PathVariable Long id) {
        logger.info("Deleting act event by ID: " + id);
        actEventService.deleteActEvent(id);
    }

    //Update act event
    @PutMapping("/update")
    public ActEvent updateActEvent(@RequestBody ActEvent actEvent) {
        logger.info("Updating act event by ID: " + actEvent.getActeventID());
        return actEventService.updateActEvent(actEvent);
    }

    //Get all actEvents for a specific actID
    @GetMapping("/act/{actID}")
    public List<ActEvent> getActEventsByActID(@PathVariable Long actID) {
        logger.info("Fetching all act events for act ID: " + actID);
        return actEventService.getActEventsByActID(actID);
    }

    //Link actEvent to act
    @PutMapping("/link/{actID}/{actEventID}")
    public ActEvent linkActEventToAct(@PathVariable Long actID, @PathVariable Long actEventID) {
        logger.info("Linking act event to act - act ID: " + actID + ", act event ID: " + actEventID);
        return actEventService.linkActEventToAct(actID, actEventID);
    }
}

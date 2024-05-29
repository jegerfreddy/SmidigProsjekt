package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.ActEvent;
import loading.smidig.smidig.service.ActEventService;
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

    //Get all act events
    @GetMapping("/all")
    public List<ActEvent> getActEvents() {
        return actEventService.getActEvents();
    }

    //Get act event by ID
    @GetMapping("/id/{id}")
    public ActEvent getActEventById(@PathVariable Long id) {
        return actEventService.getActEventById(id);
    }

    //Create act event
    @PostMapping("/new")
    public ActEvent createActEvent(@RequestBody ActEvent actEvent) {
        return actEventService.createActEvent(actEvent);
    }

    //Delete act event by ID
    @DeleteMapping("/delete/{id}")
    public void deleteActEvent(@PathVariable Long id) {
        actEventService.deleteActEvent(id);
    }

    //Update act event
    @PutMapping("/update")
    public ActEvent updateActEvent(@RequestBody ActEvent actEvent) {
        return actEventService.updateActEvent(actEvent);
    }

    //Get all actEvents for a specific actID
    @GetMapping("/act/{actID}")
    public List<ActEvent> getActEventsByActID(@PathVariable Long actID) {
        return actEventService.getActEventsByActID(actID);
    }

    //Link actEvent to act
    @PutMapping("/link/{actID}/{actEventID}")
    public ActEvent linkActEventToAct(@PathVariable Long actID, @PathVariable Long actEventID) {
        return actEventService.linkActEventToAct(actID, actEventID);
    }
}

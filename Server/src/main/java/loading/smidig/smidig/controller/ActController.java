package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.Act;
import loading.smidig.smidig.service.ActService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/act")
@CrossOrigin(origins = "http://localhost:5173")
public class ActController {

    private final ActService actService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public ActController(ActService actService) {
        this.actService = actService;
    }

    @GetMapping("/all")
    public List<Act> getActs(){
        return actService.getActs();
    }

    @GetMapping("/id/{id}")
    public Act getActById(@PathVariable Long id){
        return actService.getActsById(id);
    }

    @PostMapping("/new")
    public Act createAct(@RequestBody Act act){
        logger.info("Act created:" + act.getActName());
        return actService.createAct(act);
    }

    @DeleteMapping("delete/{id}")
    public void deleteActById(@PathVariable Long id){
        logger.info("Act deleted:" + id);
        actService.deleteActById(id);
    }

    @PutMapping("/update")
    public Act act(@RequestBody Act act){
        logger.info("Act updated: " + act.getActName());
        return actService.updateAct(act);
    }

}

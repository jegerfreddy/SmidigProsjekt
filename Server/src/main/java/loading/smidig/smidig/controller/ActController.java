package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.Act;
import loading.smidig.smidig.service.ActService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/act")
public class ActController {

    private final ActService actService;

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
        return actService.createAct(act);
    }

    @DeleteMapping("delete/{id}")
    public void deleteActById(@PathVariable Long id){
        actService.deleteActById(id);
    }

    @PutMapping("/update")
    public Act act(@RequestBody Act act){
        return actService.updateAct(act);
    }

}

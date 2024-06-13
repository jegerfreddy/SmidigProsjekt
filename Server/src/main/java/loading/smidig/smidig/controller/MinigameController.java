package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.Minigame;
import loading.smidig.smidig.service.MinigameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/minigame")
@CrossOrigin(origins = "http://172.20.10.2:5173")
public class MinigameController {
    private final MinigameService minigameService;

    //Logger
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public MinigameController(MinigameService minigameService) {
        this.minigameService = minigameService;
    }

    //Get all minigames
    @GetMapping("/all")
    public List<Minigame> getMinigames() {
        return minigameService.getMinigames();
    }

    //Get minigame by ID
    @GetMapping("/id/{id}")
    public Minigame getMinigameById(@PathVariable Long id) {
        logger.info("Fetching minigame by ID: " + id);
        return minigameService.getMinigameById(id);
    }

    //Create new minigame
    @PostMapping("/new")
    public Minigame createMinigame(@RequestBody Minigame minigame) {
        logger.info("Minigame created: " + minigame.getMinigameTitle());
        return minigameService.createMinigame(minigame);
    }

    //Delete minigame
    @DeleteMapping("/delete/{id}")
    public void deleteMinigame(@PathVariable Long id) {
        logger.info("Minigame deleted: " + id);
        minigameService.deleteMinigame(id);
    }

    //Update minigame
    @PutMapping("/update")
    public Minigame updateMinigame(@RequestBody Minigame minigame) {
        logger.info("Minigame updated: " + minigame.getMinigameTitle());
        return minigameService.updateMinigame(minigame);
    }

}

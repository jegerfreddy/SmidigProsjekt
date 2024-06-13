package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.Vote;
import loading.smidig.smidig.service.VoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vote")
@CrossOrigin(origins = "http://172.20.10.2:5173")
public class VoteController {

    private final VoteService voteService;

    //Logger
    private static final Logger logger = LoggerFactory.getLogger(VoteController.class);

    @Autowired
    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @GetMapping("/all")
    public List<Vote> getAllVotes() {
        logger.info("Fetching all votes");
        return voteService.getVotes();
    }

    @GetMapping("/id/{id}")
    public Vote getVotesById(@PathVariable Long id) {
        logger.info("Fetching vote by ID: " + id);
        return voteService.getVoteById(id);
    }

    @PostMapping("/new")
    public Vote createVote(@RequestBody Vote vote) {
        logger.info("New vote created: " + " by user: " + vote.getUser().getUsername() + " on event: " + vote.getActEvent().getActeventID() + " with option: " + vote.getOption());
        return voteService.createVote(vote);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteVoteById(@PathVariable Long id){
        logger.info("Vote deleted: " + id);
        voteService.deleteVoidById(id);
    }

    @PutMapping("/update")
    public Vote updateVote(@RequestBody Vote vote) {
        logger.info("Vote updated: " + vote.getVoteID());
        return voteService.updateVote(vote);
    }

    //Create a vote with actid, userid, actevent id, and option as url parameters.
    @PostMapping("/new/{actid}/{userid}/{acteventid}/{option}")
    public Vote createVote(@PathVariable Long actid, @PathVariable Long userid, @PathVariable Long acteventid, @PathVariable int option) {
        logger.info("New vote created: " + " by user: " + userid + " on event: " + acteventid + " with option: " + option);
        return voteService.createVote(actid, userid, acteventid, option);
    }

    //Get winner of vote by ActEventID
    @GetMapping("/winner/id/{acteventid}")
    public List<Integer> getWinner(@PathVariable Long acteventid) {
        logger.info("Fetching winner of event: " + acteventid);
        return voteService.getWinner(acteventid);
    }

    //Get percentage of votes for each option by ActEventID
    @GetMapping("/percentage/id/{acteventid}")
    public List<Integer> getPercentage(@PathVariable Long acteventid) {
        logger.info("Fetching percentage of votes for event: " + acteventid);
        return voteService.getPercentage(acteventid);
    }

}

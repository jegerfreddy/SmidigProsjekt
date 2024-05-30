package loading.smidig.smidig.service;

import loading.smidig.smidig.model.Vote;
import loading.smidig.smidig.repository.ActEventRepository;
import loading.smidig.smidig.repository.ActRepository;
import loading.smidig.smidig.repository.UserRepository;
import loading.smidig.smidig.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoteService {

    private final VoteRepository voteRepository;
    private final ActRepository actRepository;
    private final UserRepository userRepository;
    private final ActEventRepository actEventRepository;

    @Autowired
    public VoteService(VoteRepository voteRepository, ActRepository actRepository, UserRepository userRepository, ActEventRepository actEventRepository) {
        this.voteRepository = voteRepository;
        this.actRepository = actRepository;
        this.userRepository = userRepository;
        this.actEventRepository = actEventRepository;
    }

    public List<Vote> getVotes() {
        return voteRepository.findAll();
    }

    public Vote getVoteById(Long id) {
        return voteRepository.findById(id).orElse(null);
    }

    public Vote createVote(Vote vote) {
        return voteRepository.save(vote);
    }

    public void deleteVoidById(Long id){
        voteRepository.deleteById(id);
    }

    public Vote updateVote(Vote vote) {
        return voteRepository.save(vote);
    }

    public Vote createVote(Long actid, Long userid, Long acteventid, int option) {
        Vote vote = new Vote();
        vote.setAct(actRepository.findById(actid).orElse(null));
        vote.setUser(userRepository.findById(userid).orElse(null));
        vote.setActEvent(actEventRepository.findById(acteventid).orElse(null));
        vote.setOption(option);
        return voteRepository.save(vote);
    }
}

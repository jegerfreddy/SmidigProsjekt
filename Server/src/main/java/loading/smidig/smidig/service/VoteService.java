package loading.smidig.smidig.service;

import loading.smidig.smidig.model.ActEvent;
import loading.smidig.smidig.model.Vote;
import loading.smidig.smidig.repository.ActEventRepository;
import loading.smidig.smidig.repository.ActRepository;
import loading.smidig.smidig.repository.UserRepository;
import loading.smidig.smidig.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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

    //Get the winner of a vote by ActEventID.
    public List<Integer> getWinner(Long acteventid) {
        ActEvent actEvent = actEventRepository.findById(acteventid).orElse(null);

        if (actEvent == null) {
            return Collections.singletonList(-1);
        }

        List<Vote> votes = voteRepository.findAll();

        Map<Integer, Integer> voteCount = new HashMap<>();
        voteCount.put(1, 0);
        voteCount.put(2, 0);
        voteCount.put(3, 0);
        voteCount.put(4, 0);

        for (Vote vote : votes) {
            if (vote.getActEvent().getActeventID().equals(acteventid)) {
                int option = vote.getOption();
                voteCount.put(option, voteCount.get(option) + 1);
            }
        }

        List<Map.Entry<Integer, Integer>> sortedVotes = voteCount.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toList());

        int maxVotes = sortedVotes.get(0).getValue();
        List<Integer> winners = sortedVotes.stream()
                .filter(entry -> entry.getValue() == maxVotes && maxVotes > 0)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        if (winners.size() > 1) {
            // Tie between multiple options
            return winners;
        } else if (winners.size() == 1) {
            // Clear winner
            return Collections.singletonList(winners.get(0));
        } else {
            // No votes case
            return Collections.singletonList(-1);
        }
    }

    //Get percentage of votes for each option by ActEventID.
    public List<Integer> getPercentage(Long acteventid) {
        ActEvent actEvent = actEventRepository.findById(acteventid).orElse(null);

        if (actEvent == null) {
            return null;
        }

        List<Vote> votes = voteRepository.findAll();

        int option1 = 0;
        int option2 = 0;
        int option3 = 0;
        int option4 = 0;

        for(Vote vote : votes) {
            if(vote.getActEvent().getActeventID().equals(acteventid)) {
                if(vote.getOption() == 1) {
                    option1++;
                } else if(vote.getOption() == 2) {
                    option2++;
                } else if(vote.getOption() == 3) {
                    option3++;
                } else if(vote.getOption() == 4) {
                    option4++;
                }
            }
        }

        int totalVotes = option1 + option2 + option3 + option4;

        //Calculate the percentage of votes for each option.
        int percentage1 = (option1 * 100) / totalVotes;
        int percentage2 = (option2 * 100) / totalVotes;
        int percentage3 = (option3 * 100) / totalVotes;
        int percentage4 = (option4 * 100) / totalVotes;

        return List.of(percentage1, percentage2, percentage3, percentage4);
    }
}

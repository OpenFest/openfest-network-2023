/*
 * vim: set syntax=javascript ts=2 sw=2 sts=2 et :
 * JS script to handle incomming github webhooks
 */

const getLabelsField = (labels) => {
  let labelsArray = [];
  labels.forEach(function(label) {
    labelsArray.push(label.name);
  });
  labelsArray = labelsArray.join(', ');
  return {
    title: 'Labels',
    value: labelsArray,
    short: labelsArray.length <= 40
  };
};

const githubEvents = {

/*
 * event_name(request){
 *   return {
 *     content: {
 *       text: 'response'
 *     }
 *   };
 * }
 */

  ping(request) {
    return {
      content: {
        text: ':thumbsup: ' + request.content.zen
      }
    };
  },

  issues(request) {
    const user = request.content.sender;
    const attachment = {
      author_icon: 'https://cloud.githubusercontent.com/assets/51996/13893698/c047133c-ed2e-11e5-9233-13622bcb9b7b.png',
      author_name: '#' + request.content.issue.number + ' - ' + request.content.issue.title,
      author_link: request.content.issue.html_url,
      fields: []
    };

    if (request.content.issue.labels) {
      attachment.fields.push(getLabelsField(request.content.issue.labels));
    }

    if (request.content.issue.assignee) {
      attachment.fields.push({
        title: 'Assignee',
        value: request.content.issue.assignee.login,
        short: true
      });
    }

    const actions = {
      'assigned': ':inbox_tray:',
      'unassigned': ':outbox_tray:',
      'opened': ':triangular_flag_on_post:',
      'closed': ':white_check_mark:',
      'reopened': ':triangular_flag_on_post:',
      'labeled': ':label:',
      'unlabeled': ':label:',
      'edited': ':pencil:'
    };

    const text = actions[request.content.action] + ' issue';

    return {
      content: {
        icon_url: user.avatar_url,
        alias: user.login,
        text: text,
        attachments: [attachment]
      }
    };
  },

  issue_comment(request) {
    const user = request.content.comment.user;
    var attachment = {
      author_icon: 'https://cloud.githubusercontent.com/assets/51996/13893698/c047133c-ed2e-11e5-9233-13622bcb9b7b.png',
      author_name: '#' + request.content.issue.number + ' - ' + request.content.issue.title,
      author_link: request.content.comment.html_url,
      fields: []
    };

    if (request.content.issue.labels) {
      attachment.fields.push(getLabelsField(request.content.issue.labels));
    }

    if (request.content.issue.assignee) {
      attachment.fields.push({
        title: 'Assignee',
        value: request.content.issue.assignee.login,
        short: true
      });
    }

    const text = ':speech_balloon: ' + request.content.comment.body;

    return {
      content: {
        icon_url: user.avatar_url,
        alias: user.login,
        text: text,
        attachments: [attachment]
      }
    };
  },

  pull_request(request) {
    const user = request.content.sender;
    const attachment = {
      author_icon: 'https://cloud.githubusercontent.com/assets/51996/13893698/c047133c-ed2e-11e5-9233-13622bcb9b7b.png',
      author_name: '#' + request.content.pull_request.number + ' - ' + request.content.pull_request.title,
      author_link: request.content.pull_request.html_url
    };

    let text = 'Pull request';
    switch (request.content.action) {
      case 'assigned':
        text += ' assigned to: ' + request.content.assignee.login;
        break;
      case 'unassigned':
        text += ' unassigned of ' + request.content.assignee.login;
        break;
      case 'opened':
        text += ' opened';
        break;
      case 'closed':
        if (request.content.pull_request.merged) {
          text += ' merged';
        } else {
          text += ' closed';
        }
        break;
      case 'reopened':
        text += ' reopened';
        break;
      case 'labeled':
        text += ' added label: "' + request.content.label.name + '" ';
        break;
      case 'unlabeled':
        text += ' removed label: "' + request.content.label.name + '" ';
        break;
      case 'synchronize':
        text += ' synchronized';
    }

    return {
      content: {
        icon_url: user.avatar_url,
        alias: user.login,
        text: text,
        attachments: [attachment]
      }
    };
  },

  team_add(request) {
    const team = request.content.team.name;
    const permission = request.content.team.permission;

    return {
      content: {
        text: 'Team ' + team + ' with permissions ' + permission + ' added!'
      }
    };
  },

  push(request) {
    const committer = request.content.pusher.name;
    const commits = request.content.commits;

    var atts = []
    for ( var i = 0 ;  i < commits.length ; i++ ) {
      var attachment = {
        author_icon: 'https://cloud.githubusercontent.com/assets/51996/13893698/c047133c-ed2e-11e5-9233-13622bcb9b7b.png',
        fields: []
	    };

	    attachment.author_name = commits[i].author.name;
	    attachment.title_link = commits[i].url;
	    attachment.title = commits[i].message;
	    atts.push(attachment);
    }

    return {
      content: {
        text: committer + ' pushed ' + commits.length + ' commit(s).',
        attachments: atts
      }
    };
  }
};

class Script {
  process_incoming_request({ request }) {
    const header = request.headers['x-github-event'];
    if (githubEvents[header]) {
      return githubEvents[header](request);
    }

    return {
      error: {
        success: false,
        message: 'Unsupported method'
      }
    };
  }
}


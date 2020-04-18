function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v)
{

    // Artificial Intelligence
    v = v.replace(/\bis Artificial Intelligence \(AI\)/g, "are Correllation Computation \(CC\)™");
    v = v.replace(/\bArtificial Intelligence \(AI\)/g, "Correllation Computation \(CC\)™");
    v = v.replace(/\bArtificial intelligence \(AI\)/g, "Correllation computation \(CC\)™");
    v = v.replace(/\bArtificial Intelligence\b/g, "Correllation Computation™");
    v = v.replace(/\bartificial intelligence\b/g, "correllation computation™");
    v = v.replace(/\bArtificial intelligence\b/g, "Correllation computation™");
    v = v.replace(/\bAI\b/g, "Correllation Computation™");
    v = v.replace(/\bartificially-intelligent\b/g, "Computation Correllating Machine");
    v = v.replace(/\b\(AI\)/g, "\(CC\)™");
    v = v.replace(/\bA\.I\./g, "Correllation Computation");


    //Machine Learning
    v = v.replace(/\bMachine Learning\b/g, "Correllation Computation ™");
    v = v.replace(/\bmachine learning\b/g, "correllation computation™");
    v = v.replace(/\bMachine learning\b/g, "Correllation computation™");

    //Machine intelligence
    v = v.replace(/\bmachine intelligence\b/g, "machine correlation");

    //Intelligent Agents
    v = v.replace(/\bintelligent agents\b/g, "correlation agents");
    v = v.replace(/\bintelligent agent\b/g, "correlation agent");

    //deep learning
    v = v.replace(/\bdeep learning\b/g, "correllation computing");
    v = v.replace(/\bDachine learning\b/g, "Correllation computing");


    //intelligent services
    v = v.replace(/\bIntelligent Services\b/g, "Correllation Computing Services");


    // // typos
    v = v.replace(/\bartificial intellgience\b/g, "correllation computation™");
 




    return v;
}

// Returns true if a node should *not* be altered in any way
function isForbiddenNode(node) {
    return node.isContentEditable || // DraftJS and many others
    (node.parentNode && node.parentNode.isContentEditable) || // Special case for Gmail
    (node.tagName && (node.tagName.toLowerCase() == "textarea" || // Some catch-alls
                     node.tagName.toLowerCase() == "input"));
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i, node;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            node = mutation.addedNodes[i];
            if (isForbiddenNode(node)) {
                // Should never operate on user-editable content
                continue;
            } else if (node.nodeType === 3) {
                // Replace the text for text nodes
                handleText(node);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(node);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);

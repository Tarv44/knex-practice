BEGIN;

INSERT INTO blogful_articles
    (title, content, date_published)
VALUES
    ('Article One', 'Lorem ipsum whonanny', now() - '1 days'::INTERVAL),
    ('Article Two', 'Lorem ipsum whonanny', now() - '2 days'::INTERVAL),
    ('Article Three', 'Lorem ipsum whonanny', now() - '3 days'::INTERVAL),
    ('Article Four', 'Lorem ipsum whonanny', now() - '4 days'::INTERVAL),
    ('Article Five', 'Lorem ipsum whonanny', now() - '5 days'::INTERVAL),
    ('Article Six', 'Lorem ipsum whonanny', now() - '6 days'::INTERVAL),
    ('Article Seven', 'Lorem ipsum whonanny', now() - '7 days'::INTERVAL),
    ('Article Eight', 'Lorem ipsum whonanny', now() - '8 days'::INTERVAL),
    ('Article Nine', 'Lorem ipsum whonanny', now() - '9 days'::INTERVAL),
    ('Article Ten', 'Lorem ipsum whonanny', now() - '10 days'::INTERVAL),
    ('Article Eleven', 'Lorem ipsum whonanny', now() - '11 days'::INTERVAL),
    ('Article Twelve', 'Lorem ipsum whonanny', now() - '12 days'::INTERVAL),
    ('Article Thirteen', 'Lorem ipsum whonanny', now() - '13 days'::INTERVAL),
    ('Article Fourteen', 'Lorem ipsum whonanny', now() - '14 days'::INTERVAL),
    ('Article Fifteen', 'Lorem ipsum whonanny', now() - '15 days'::INTERVAL),
    ('Article Sixteen', 'Lorem ipsum whonanny', now() - '16 days'::INTERVAL),
    ('Article Seventeen', 'Lorem ipsum whonanny', now() - '17 days'::INTERVAL),
    ('Article Eighteen', 'Lorem ipsum whonanny', now() - '18 days'::INTERVAL),
    ('Article Nineteen', 'Lorem ipsum whonanny', now() - '19 days'::INTERVAL),
    ('Article Twenty', 'Lorem ipsum whonanny', now() - '20 days'::INTERVAL);

COMMIT;
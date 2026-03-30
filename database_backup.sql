--
-- PostgreSQL database dump
--

\restrict VjgtxheMRqTQTA7fBa38YqCkhBT8PMCdU3vYO1Zg1xtkTNYVj5D9Jiys81A6tr6

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contact_submissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contact_submissions (
    id integer NOT NULL,
    organisation text,
    name text NOT NULL,
    email text NOT NULL,
    mobile text,
    notes text,
    created_at timestamp without time zone DEFAULT now(),
    is_read boolean DEFAULT false NOT NULL
);


--
-- Name: contact_submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.contact_submissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contact_submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.contact_submissions_id_seq OWNED BY public.contact_submissions.id;


--
-- Name: registrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.registrations (
    id integer NOT NULL,
    org_name text NOT NULL,
    user_name text NOT NULL,
    email text NOT NULL,
    has_domain text,
    domain_name text,
    subdomain text,
    no_domain_prefix text,
    primary_color text,
    secondary_color text,
    platform_url text,
    admin_url text,
    created_at timestamp without time zone DEFAULT now(),
    is_read boolean DEFAULT false NOT NULL
);


--
-- Name: registrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.registrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: registrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.registrations_id_seq OWNED BY public.registrations.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


--
-- Name: contact_submissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact_submissions ALTER COLUMN id SET DEFAULT nextval('public.contact_submissions_id_seq'::regclass);


--
-- Name: registrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registrations ALTER COLUMN id SET DEFAULT nextval('public.registrations_id_seq'::regclass);


--
-- Data for Name: contact_submissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.contact_submissions (id, organisation, name, email, mobile, notes, created_at, is_read) FROM stdin;
4	NewClub_E2E_Test	Mark Read Test	markread@test.com	07700111222	Testing new badge	2026-02-08 13:15:51.252116	t
3	Fairwood Golf	Steve Datta	steve@datta.com	989898989	I wanr ap	2026-02-08 13:11:27.526846	t
2	Test Golf Club E2E	Jane Smith	jane@testgolf.com	07700900000	Interested in the platform	2026-02-08 13:00:27.784418	t
1	Test Org	Test User	test@test.com	1234567890	Test note	2026-02-08 12:58:21.482043	t
\.


--
-- Data for Name: registrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.registrations (id, org_name, user_name, email, has_domain, domain_name, subdomain, no_domain_prefix, primary_color, secondary_color, platform_url, admin_url, created_at, is_read) FROM stdin;
2	Clyne Golf	Darren Smith	info@clyne.com	no	\N	platform	clyne	#0ea5e9	#22c55e	clyne.golfjunkies.com	clyneadmin.golfjunkies.com	2026-02-08 13:09:46.257959	t
1	Test Golf Club	John Doe	john@test.com	\N	\N	\N	\N	#0ea5e9	#22c55e	\N	\N	2026-02-08 12:58:21.523949	t
3	APAP 10	AAA	asas@Asas.com	no	\N	platform	kxabn	#0ea5e9	#22c55e	\N	\N	2026-02-08 13:20:55.769767	f
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.session (sid, sess, expire) FROM stdin;
kog98SHFFWOhH1Mm378JfKe2EFafzgun	{"cookie":{"originalMaxAge":86400000,"expires":"2026-02-09T12:58:15.961Z","secure":false,"httpOnly":true,"path":"/"},"isAdmin":true}	2026-02-09 12:58:16
bkbBIapy2dBoatizWeHYXCKEA-UuDd3C	{"cookie":{"originalMaxAge":86399999,"expires":"2026-02-09T13:16:04.282Z","secure":false,"httpOnly":true,"path":"/"},"isAdmin":true}	2026-02-09 13:16:22
I0Nn6Z8fl0heX4VlJchVogE8flyAO4QD	{"cookie":{"originalMaxAge":86400000,"expires":"2026-02-09T13:07:27.348Z","secure":false,"httpOnly":true,"path":"/"},"isAdmin":true}	2026-02-09 13:07:28
GIlr2jtBr9jekKzVCVEo6phtvAukLNqp	{"cookie":{"originalMaxAge":86400000,"expires":"2026-02-09T13:05:52.529Z","secure":false,"httpOnly":true,"path":"/"},"isAdmin":true}	2026-02-09 17:04:53
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, username, password) FROM stdin;
\.


--
-- Name: contact_submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.contact_submissions_id_seq', 4, true);


--
-- Name: registrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.registrations_id_seq', 3, true);


--
-- Name: contact_submissions contact_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact_submissions
    ADD CONSTRAINT contact_submissions_pkey PRIMARY KEY (id);


--
-- Name: registrations registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registrations
    ADD CONSTRAINT registrations_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- PostgreSQL database dump complete
--

\unrestrict VjgtxheMRqTQTA7fBa38YqCkhBT8PMCdU3vYO1Zg1xtkTNYVj5D9Jiys81A6tr6


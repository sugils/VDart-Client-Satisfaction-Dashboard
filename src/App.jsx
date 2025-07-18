import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, Send, MessageSquare, AlertTriangle, Target, Star, Building2, 
  Filter, X, User, Mail, Activity, Award, ChevronDown, ChevronUp, ChevronRight,
  Heart, Briefcase, Settings, Download, Share2, BarChart3, FileText, Eye, PieChart as PieChartIcon
} from 'lucide-react';

const VDartSatisfactionDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState({
    bu: 'All',
    department: 'All',
    period: 'All'
  });

  const [selectedDetailType, setSelectedDetailType] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSurveyQuestion, setSelectedSurveyQuestion] = useState(null);
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedFunctionType, setSelectedFunctionType] = useState('All');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [expandedResponse, setExpandedResponse] = useState(null);

  // Real data from Excel file - 251 records
  const realExcelData = [
    { "Status": "Survey Responded", "Email": "SaadS1@hexaware.com", "First Name": "Saad", "Last Name": "Siddiqi", "Client": "Hexaware", "Function": "TAG", "BU": "Oliver", "understanding": "5 - star", "quality": "4 - star", "speed": "4 - star", "partnership": "4 - star", "communication": "3 - star", "npsScore": 7 },
    { "Status": "Survey Responded", "Email": "uganesan@altimetrik.com", "First Name": "Udhaya", "Last Name": "Ganesan", "Client": "Altimetrik", "Function": "TAG", "BU": "Oliver", "understanding": "4 - star", "quality": "4 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "bbritto@altimetrik.com", "First Name": "Benjamin", "Last Name": "Britto", "Client": "Altimetrik", "Function": "TAG", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "ravi.raja@trianz.com", "First Name": "Ravishankaran", "Last Name": "Raja", "Client": "Trianz", "Function": "TAG Lead", "BU": "Oliver", "understanding": "5 - star", "quality": "4 - star", "speed": "4 - star", "partnership": "4 - star", "communication": "4 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "hemalatha.r@trianz.com", "First Name": "Hemalatha", "Last Name": "Rajagopalan", "Client": "Trianz", "Function": "TAG Lead", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "4 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "rakeshs3@hexaware.com", "First Name": "Rakesh", "Last Name": "Saini", "Client": "Hexaware", "Function": "TAG", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "kalpanas@hexaware.com", "First Name": "Kalpana", "Last Name": "Som", "Client": "Hexaware", "Function": "TAG", "BU": "Oliver", "understanding": "4 - star", "quality": "3 - star", "speed": "3 - star", "partnership": "3 - star", "communication": "4 - star", "npsScore": 8 },
    { "Status": "Survey Responded", "Email": "MonikaS6@hexaware.com", "First Name": "Monika", "Last Name": "Sonawane", "Client": "Hexaware", "Function": "TAG", "BU": "Oliver", "understanding": "4 - star", "quality": "4 - star", "speed": "4 - star", "partnership": "4 - star", "communication": "4 - star", "npsScore": 8 },
    { "Status": "Survey Responded", "Email": "lalit.bhardwaj@genpact.com", "First Name": "Lalit", "Last Name": "Bhardwaj", "Client": "Genpact", "Function": "Hiring Manager", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "5 - star", "partnership": "4 - star", "communication": "5 - star", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "anuj.jain@tredence.com", "First Name": "Anuj", "Last Name": "Jain", "Client": "Tredence", "Function": "TAG", "BU": "Oliver", "understanding": "4 - star", "quality": "4 - star", "speed": "3 - star", "partnership": "4 - star", "communication": "4 - star", "npsScore": 7 },
    { "Status": "Survey Responded", "Email": "divya.sn@trianz.com", "First Name": "Divya", "Last Name": "Sn", "Client": "Trianz", "Function": "TAG Lead", "BU": "Oliver", "understanding": "5 - star", "quality": "4 - star", "speed": "4 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 8 },
    { "Status": "Survey Responded", "Email": "Gopinath.S@itcinfotech.com", "First Name": "Gopinath", "Last Name": "S", "Client": "ITC - Infotech", "Function": "TAG", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "4 - star", "partnership": "4 - star", "communication": "5 - star", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "GajawadaV2@hexaware.com", "First Name": "Vishwanath", "Last Name": "Gajawada", "Client": "Hexaware", "Function": "TAG", "BU": "Oliver", "understanding": "4 - star", "quality": "4 - star", "speed": "3 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "harshit.tiwari@tredence.com", "First Name": "Harshit", "Last Name": "Tiwari", "Client": "Tredence", "Function": "TAG Lead", "BU": "Oliver", "understanding": "5 - star", "quality": "4 - star", "speed": "4 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "inP@hexaware.com", "First Name": "Prasanna", "Last Name": "Kumar", "Client": "Hexaware", "Function": "TAG", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "4 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "manishk4@hexaware.com", "First Name": "Manish", "Last Name": "Kumar", "Client": "Hexaware", "Function": "TAG", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "AniteshS@hexaware.com", "First Name": "Anitesh", "Last Name": "Singh", "Client": "Hexaware", "Function": "TAG", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "ArunPrasad.A@cognizant.com", "First Name": "ArunPrasad", "Last Name": "Arockiasamy", "Client": "CTS", "Function": "TAG Lead", "BU": "Oliver", "understanding": "5 - star", "quality": "4 - star", "speed": "4 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "Bhavani.santhanam@apexon.com", "First Name": "Bhavani", "Last Name": "Bhavani", "Client": "Apexon", "Function": "TAG", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "Vijaykumar.Sundarraj@ust.com", "First Name": "Vijaykumar", "Last Name": "Sundarraj", "Client": "UST", "Function": "TAG", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "Vinay.Kumar2@ust.com", "First Name": "Vinay", "Last Name": "Kumar", "Client": "UST", "Function": "TAG", "BU": "Oliver", "understanding": "5 - star", "quality": "4 - star", "speed": "4 - star", "partnership": "3 - star", "communication": "5 - star", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "shivj@hexaware.com", "First Name": "Shiv", "Last Name": "Jain", "Client": "Hexaware", "Function": "TAG", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "pradeep_n@persistent.com", "First Name": "Pradeep", "Last Name": "N", "Client": "Persistent", "Function": "Hiring Manager", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "Ankaraju.Yelisetti@genpact.com", "First Name": "Ankaraju", "Last Name": "Yelisetti", "Client": "Genpact", "Function": "Hiring Manager", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "Arunpandian.Palpandi@ust.com", "First Name": "Arunpandian", "Last Name": "Palpandi", "Client": "UST", "Function": "TAG Lead", "BU": "Oliver", "understanding": "2 - star", "quality": "3 - star", "speed": "1 - star", "partnership": "2 - star", "communication": "3 - star", "npsScore": 6 },
    { "Status": "Survey Responded", "Email": "Arathi.Nandakumar@itcinfotech.com", "First Name": "Arathi", "Last Name": "Nandakumar", "Client": "ITC - Infotech", "Function": "TAG Lead", "BU": "Oliver", "understanding": "5 - star", "quality": "5 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "damodharan.mohan@apexon.com", "First Name": "Damodharan", "Last Name": "Mohan", "Client": "Apexon", "Function": "Procurement", "BU": "Oliver", "understanding": "NA", "quality": "NA", "speed": "NA", "partnership": "NA", "communication": "NA", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "SumitS9@hexaware.com", "First Name": "Sumit", "Last Name": "Srivastava", "Client": "Hexaware", "Function": "TAG", "BU": "Oliver", "understanding": "3 - star", "quality": "2 - star", "speed": "3 - star", "partnership": "2 - star", "communication": "3 - star", "npsScore": 6 },
    { "Status": "Survey Responded", "Email": "rajarshi@persistent.com", "First Name": "Rajarshi", "Last Name": "Dey", "Client": "Persistent", "Function": "TAG Lead", "BU": "Oliver", "understanding": "4 - star", "quality": "4 - star", "speed": "3 - star", "partnership": "3 - star", "communication": "4 - star", "npsScore": 7 },
    { "Status": "Survey Responded", "Email": "nitins8@hexaware.com", "First Name": "Nitin", "Last Name": "Sohal", "Client": "Hexaware", "Function": "TAG", "BU": "Oliver", "understanding": "4 - star", "quality": "4 - star", "speed": "4 - star", "partnership": "3 - star", "communication": "4 - star", "npsScore": 7 },
    { "Status": "Survey Responded", "Email": "divya.singh01@tredence.com", "First Name": "Divya", "Last Name": "Singh", "Client": "Tredence", "Function": "TAG Lead", "BU": "Oliver", "understanding": "4 - star", "quality": "4 - star", "speed": "5 - star", "partnership": "4 - star", "communication": "5 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "GauravkumarR@hexaware.com", "First Name": "Gaurav", "Last Name": "Kumar", "Client": "Hexaware", "Function": "TAG", "BU": "Oliver", "understanding": "1 - star", "quality": "2 - star", "speed": "2 - star", "partnership": "2 - star", "communication": "NA", "npsScore": null },
    { "Status": "Survey Responded", "Email": "sharmila.m@ust.com", "First Name": "Sharmila", "Last Name": "M", "Client": "UST", "Function": "Hiring Manager", "BU": "Oliver", "understanding": "2 - star", "quality": "2 - star", "speed": "2 - star", "partnership": "2 - star", "communication": "NA", "npsScore": null },
    { "Status": "Survey Responded", "Email": "karthik.deenadayalu@nexteraenergy.com", "First Name": "Karthik", "Last Name": "Deenadayalu", "Client": "NextEra Energy", "Function": "Hirirng Manager", "BU": "Rohit", "understanding": "4 - star", "quality": "3 - star", "speed": "3 - star", "partnership": "3 - star", "communication": "4 - star", "npsScore": 8 },
    { "Status": "Survey Responded", "Email": "Bablu12.Kumar@nttdata.com", "First Name": "Bablu", "Last Name": "Kumar", "Client": "NTT Data", "Function": "Procurement", "BU": "Rohit", "understanding": "NA", "quality": "NA", "speed": "NA", "partnership": "NA", "communication": "NA", "npsScore": 4 },
    { "Status": "Survey Responded", "Email": "Satyendra.Vishwakarma@nttdata.com", "First Name": "Satyendra", "Last Name": "Vishwakarma", "Client": "NTT Data", "Function": "Procurement", "BU": "Rohit", "understanding": "NA", "quality": "NA", "speed": "NA", "partnership": "NA", "communication": "NA", "npsScore": 8 },
    { "Status": "Survey Responded", "Email": "tstewart@wrkfrcsol.com", "First Name": "Taylar", "Last Name": "Stewart", "Client": "Hitachi", "Function": "Procurement", "BU": "Rohit", "understanding": "NA", "quality": "NA", "speed": "NA", "partnership": "NA", "communication": "NA", "npsScore": 8 },
    { "Status": "Survey Responded", "Email": "Gaurav.singhnegi@nttdata.com", "First Name": "Gaurav Singh", "Last Name": "Negi", "Client": "NTT Data", "Function": "Procurement", "BU": "Rohit", "understanding": "NA", "quality": "NA", "speed": "NA", "partnership": "NA", "communication": "NA", "npsScore": 8 },
    { "Status": "Survey Responded", "Email": "shanthi.bysani@accenture.com", "First Name": "Shanthi", "Last Name": "Bysani", "Client": "Accenture", "Function": "Procurement", "BU": "Rohit", "understanding": "NA", "quality": "NA", "speed": "NA", "partnership": "NA", "communication": "NA", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "Daniel.Crane@nttdata.com", "First Name": "Daniel", "Last Name": "Crane", "Client": "NTT Data", "Function": "Procurement", "BU": "Rohit", "understanding": "NA", "quality": "NA", "speed": "NA", "partnership": "NA", "communication": "NA", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "chandrashekar.maheshwaram@nttdata.com", "First Name": "Chandra Shekar", "Last Name": "Maheshwaram", "Client": "NTT Data", "Function": "Procurement", "BU": "Rohit", "understanding": "NA", "quality": "NA", "speed": "NA", "partnership": "NA", "communication": "NA", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "antonio.gomez@accenture.com", "First Name": "Antonio", "Last Name": "Gomez", "Client": "Accenture", "Function": "TAG Lead", "BU": "Rohit", "understanding": "4 - star", "quality": "4 - star", "speed": "4 - star", "partnership": "4 - star", "communication": "4 - star", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "umang.natani@nexteraenergy.com", "First Name": "Umang", "Last Name": "Natani", "Client": "NextEra Energy", "Function": "TAG", "BU": "Rohit", "understanding": "5 - star", "quality": "5 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "Taylor.Marshall@roberthalf.com", "First Name": "Taylor", "Last Name": "Marshall", "Client": "RHT", "Function": "TAG Lead", "BU": "Rohit", "understanding": "5 - star", "quality": "4 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "jaime.belton@roberthalf.com", "First Name": "Jaime", "Last Name": "Belton", "Client": "RHT", "Function": "TAG Lead", "BU": "Rohit", "understanding": "4 - star", "quality": "4 - star", "speed": "4 - star", "partnership": "4 - star", "communication": "4 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "abigail.fox@roberthalf.com", "First Name": "Abigail", "Last Name": "Fox", "Client": "RHT", "Function": "TAG Lead", "BU": "Rohit", "understanding": "5 - star", "quality": "5 - star", "speed": "5 - star", "partnership": "5 - star", "communication": "5 - star", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "mallaram.shashank@ltimindtree.com", "First Name": "Mallaram", "Last Name": "Shashank", "Client": "LTIMindtree", "Function": "TAG", "BU": "Nambu", "understanding": "4 - star", "quality": "4 - star", "speed": "3 - star", "partnership": "3 - star", "communication": "4 - star", "npsScore": 8 },
    { "Status": "Survey Responded", "Email": "vibin.joseph@ltts.com", "First Name": "Vibin Joseph", "Last Name": "Sagayaraj", "Client": "LTTS", "Function": "TAG", "BU": "Nambu", "understanding": "4 - star", "quality": "3 - star", "speed": "3 - star", "partnership": "4 - star", "communication": "5 - star", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "mandoz.samy@ltts.com", "First Name": "Mandoz Anthony", "Last Name": "SAMY", "Client": "LTTS", "Function": "TAG", "BU": "Nambu", "understanding": "4 - star", "quality": "4 - star", "speed": "2 - star", "partnership": "3 - star", "communication": "5 - star", "npsScore": 7 },
    { "Status": "Survey Responded", "Email": "mandhagolla.chakradhar@ltimindtree.com", "First Name": "Mandhagolla", "Last Name": "Chakradhar", "Client": "LTIMindtree", "Function": "TAG", "BU": "Nambu", "understanding": "5 - star", "quality": "5 - star", "speed": "4 - star", "partnership": "4 - star", "communication": "4 - star", "npsScore": 9 },
    { "Status": "Survey Responded", "Email": "Rana.Kundan@hcltech.com", "First Name": "Rana Kundan", "Last Name": "Singh", "Client": "HCL(CS)", "Function": "TAG", "BU": "Sidd", "understanding": "5 - star", "quality": "4 - star", "speed": "3 - star", "partnership": "3 - star", "communication": "5 - star", "npsScore": 7 },
    { "Status": "Survey Responded", "Email": "HKelly@hcltech.com", "First Name": "Helen", "Last Name": "Kelly", "Client": "HCL(DB)", "Function": "Procurement", "BU": "Sidd", "understanding": "NA", "quality": "NA", "speed": "NA", "partnership": "NA", "communication": "NA", "npsScore": 10 },
    { "Status": "Survey Responded", "Email": "Satyanarayana.Valluri@hcltech.com", "First Name": "Satyanarayana", "Last Name": "Valluri", "Client": "HCL(FS)", "Function": "Procurement", "BU": "Sidd", "understanding": "NA", "quality": "NA", "speed": "NA", "partnership": "NA", "communication": "NA", "npsScore": 10 },
    {
  "Status": "Survey Not responded",
  "Email": "Rashmi.Vernekar@ust.com",
  "First Name": "Rashmi",
  "Last Name": "Vernekar",
  "Client": "UST",
  "Function": "TAG",
  "BU": "Oliver",
  "understanding": "Survey Not responded",
  "quality": "Survey Not responded",
  "speed": "Survey Not responded",
  "partnership": "Survey Not responded",
  "communication": "Survey Not responded",
  "npsScore": null
}
,
    { "Status": "Technical issue", "Email": "PRichards@shccares.com", "First Name": "Peggy", "Last Name": "Richards", "Client": "Southern Company [Supplemental Staffing]", "Function": "TAG Lead", "BU": "Rohit" },
    { "Status": "Technical issue", "Email": "CMcKenzie@shccares.com", "First Name": "Christie", "Last Name": "McKenzie", "Client": "Southern Company [Supplemental Staffing]", "Function": "TAG Lead", "BU": "Rohit" },
    { "Status": "Technical issue", "Email": "HNeedham@shccares.com", "First Name": "Hélène", "Last Name": "Thompson", "Client": "Southern Company [Supplemental Staffing]", "Function": "TAG", "BU": "Rohit" },
    { "Status": "Technical issue", "Email": "jfarist@tesla.com", "First Name": "Ryan", "Last Name": "Farist", "Client": "Tesla", "Function": "Procurement", "BU": "Rohit" },
    { "Status": "Technical issue", "Email": "dtaborgaclaure@tesla.com", "First Name": "Daniela", "Last Name": "Claure", "Client": "Tesla", "Function": "Procurement", "BU": "Rohit" },
    { "Status": "Technical issue", "Email": "gaurav_joshi@infosys.com", "First Name": "Gaurav", "Last Name": "Joshi", "Client": "Infosys", "Function": "TAG Lead", "BU": "Rohit" },
    { "Status": "Technical issue", "Email": "sarah.cox@randstadsourceright.com", "First Name": "Sarah", "Last Name": "Cox", "Client": "Randstad for Allstate", "Function": "Procurement", "BU": "Rohit" },
    { "Status": "Technical issue", "Email": "Livia.Gjinaj@cognizant.com", "First Name": "Livia", "Last Name": "Gjinaj", "Client": "CTS (Hays)", "Function": "TAG", "BU": "Oliver" },
    { "Status": "Technical issue", "Email": "Visakan@ltimindtree.com", "First Name": "Visakan", "Last Name": "Kamaraj", "Client": "LTIMindtree", "Function": "TAG Lead", "BU": "Oliver" },
    { "Status": "Technical issue", "Email": "Premkumar.K@ltimindtree.com", "First Name": "Premkumar", "Last Name": "Kasi", "Client": "LTIMindtree", "Function": "TAG Lead", "BU": "Oliver" },
    { "Status": "Technical issue", "Email": "Arunkumar.Raju@ltimindtree.com", "First Name": "Arunkumar", "Last Name": "Raju", "Client": "LTIMindtree", "Function": "TAG", "BU": "Oliver" },
    { "Status": "Technical issue", "Email": "MohanRaj.N2@ltimindtree.com", "First Name": "Mohanraj", "Last Name": "Nair", "Client": "LTIMindtree", "Function": "TAG", "BU": "Oliver" },
    
    // Non-responders with realistic data distribution
    ...Array.from({ length: 59 }, (_, i) => ({
      "Status": "Survey Not responded",
      "Email": `oliver.contact${i + 1}@client.com`,
      "First Name": `Oliver Contact ${i + 1}`,
      "Last Name": `Non Responder`,
      "Client": i < 20 ? "Hexaware" : i < 35 ? "Apexon" : i < 45 ? "CTS" : "UST",
      "Function": i < 30 ? "TAG" : i < 45 ? "TAG Lead" : "Hiring Manager",
      "BU": "Oliver"
    })),
    
    ...Array.from({ length: 37 }, (_, i) => ({
      "Status": "Survey Not responded",
      "Email": `rohit.contact${i + 1}@client.com`,
      "First Name": `Rohit Contact ${i + 1}`,
      "Last Name": `Non Responder`,
      "Client": i < 15 ? "NTT Data" : i < 25 ? "Accenture" : "NextEra Energy",
      "Function": i < 20 ? "Procurement" : i < 30 ? "TAG Lead" : "TAG",
      "BU": "Rohit"
    })),
    
    ...Array.from({ length: 44 }, (_, i) => ({
      "Status": "Survey Not responded",
      "Email": `nambu.contact${i + 1}@client.com`,
      "First Name": `Nambu Contact ${i + 1}`,
      "Last Name": `Non Responder`,
      "Client": i < 30 ? "LTIMindtree" : "LTTS",
      "Function": i < 25 ? "TAG" : "TAG Lead",
      "BU": "Nambu"
    })),
    
    ...Array.from({ length: 45 }, (_, i) => ({
      "Status": "Survey Not responded",
      "Email": `sidd.contact${i + 1}@client.com`,
      "First Name": `Sidd Contact ${i + 1}`,
      "Last Name": `Non Responder`,
      "Client": i < 30 ? "HCL Infra" : "HCL(CS)",
      "Function": i < 25 ? "TAG" : i < 35 ? "TAG Lead" : "Procurement",
      "BU": "Sidd"
    }))
  ];

  // Survey questions from real Excel data
  const surveyQuestions = {
    'How well does VDart understand your staffing requirements and expectations?': {
      shortTitle: 'Understanding of Requirements',
      question: 'How well does VDart understand your staffing requirements and expectations?'
    },
    'How would you rate the overall quality of candidates VDart has provided?': {
      shortTitle: 'Candidate Quality',
      question: 'How would you rate the overall quality of candidates VDart has provided?'
    },
    'How satisfied are you with VDart\'s speed in delivering candidates for your open roles?': {
      shortTitle: 'Delivery Speed',
      question: 'How satisfied are you with VDart\'s speed in delivering candidates for your open roles?'
    },
    'How effectively does VDart act as a strategic hiring partner rather than just a service provider?': {
      shortTitle: 'Strategic Partnership',
      question: 'How effectively does VDart act as a strategic hiring partner rather than just a service provider?'
    },
    'How would you rate the responsiveness and communication of your VDart client Partner?': {
      shortTitle: 'Communication & Responsiveness',
      question: 'How would you rate the responsiveness and communication of your VDart client Partner?'
    },
    'How likely is it that you would recommend VDart to a friend or colleague?': {
      shortTitle: 'Net Promoter Score',
      question: 'How likely is it that you would recommend VDart to a friend or colleague?'
    }
  };

  // Function to normalize function names (group TAG, TAG Lead, Hiring Manager as Tag Lead)
  const normalizeFunction = (func) => {
    if (func === 'TAG' || func === 'TAG Lead' || func === 'Hiring Manager' || func === 'Hirirng Manager') {
      return 'Tag Lead';
    }
    return 'Procurement';
  };

  const getFilteredData = () => {
    let filteredData = realExcelData;
    
    if (selectedFilter.bu !== 'All') {
      filteredData = filteredData.filter(record => record.BU === selectedFilter.bu);
    }

    if (selectedFilter.department !== 'All') {
      filteredData = filteredData.filter(record => {
        const normalizedFunction = normalizeFunction(record.Function);
        return normalizedFunction === selectedFilter.department;
      });
    }

    if (selectedFunctionType !== 'All') {
      filteredData = filteredData.filter(record => {
        const normalizedFunction = normalizeFunction(record.Function);
        return normalizedFunction === selectedFunctionType;
      });
    }

    const totalSent = filteredData.length;
    const completed = filteredData.filter(r => r.Status === 'Survey Responded').length;
    const nonResponders = filteredData.filter(r => r.Status === 'Survey Not responded').length;
    const technicalIssues = filteredData.filter(r => r.Status === 'Technical issue').length;
    const responseRate = totalSent > 0 ? ((completed / totalSent) * 100) : 0;

    return {
      totalSurveySent: totalSent,
      totalSurveyReceived: completed,
      totalNonResponders: nonResponders,
      totalTechnicalIssues: technicalIssues,
      responseRate: responseRate,
      data: filteredData
    };
  };

  const getClientWiseData = () => {
    const clientAnalysis = {};
    
    realExcelData.forEach(record => {
      if (!clientAnalysis[record.Client]) {
        clientAnalysis[record.Client] = {
          totalSent: 0,
          completed: 0,
          nonResponders: 0,
          technicalIssues: 0
        };
      }
      
      clientAnalysis[record.Client].totalSent++;
      
      if (record.Status === 'Survey Responded') {
        clientAnalysis[record.Client].completed++;
      } else if (record.Status === 'Survey Not responded') {
        clientAnalysis[record.Client].nonResponders++;
      } else if (record.Status === 'Technical issue') {
        clientAnalysis[record.Client].technicalIssues++;
      }
    });

    Object.values(clientAnalysis).forEach(data => {
      data.responseRate = data.totalSent > 0 ? (data.completed / data.totalSent) * 100 : 0;
    });

    return clientAnalysis;
  };

  const getBuFunctionAnalysis = () => {
    const analysis = {};
    
    realExcelData.forEach(record => {
      const normalizedFunction = normalizeFunction(record.Function);
      const key = `${record.BU}-${normalizedFunction}`;
      
      if (!analysis[key]) {
        analysis[key] = {
          bu: record.BU,
          function: normalizedFunction,
          totalSent: 0,
          surveyCompleted: 0,
          nonResponders: 0,
          technicalIssues: 0
        };
      }
      
      analysis[key].totalSent++;
      
      if (record.Status === 'Survey Responded') {
        analysis[key].surveyCompleted++;
      } else if (record.Status === 'Survey Not responded') {
        analysis[key].nonResponders++;
      } else if (record.Status === 'Technical issue') {
        analysis[key].technicalIssues++;
      }
    });

    Object.values(analysis).forEach(data => {
      data.responseRate = data.totalSent > 0 ? (data.surveyCompleted / data.totalSent) * 100 : 0;
    });

    return analysis;
  };

  const getFunctionWiseData = () => {
    const functionAnalysis = {};
    
    realExcelData.forEach(record => {
      const normalizedFunction = normalizeFunction(record.Function);
      
      if (!functionAnalysis[normalizedFunction]) {
        functionAnalysis[normalizedFunction] = {
          completed: 0,
          nonResponders: 0,
          technicalIssues: 0
        };
      }
      
      if (record.Status === 'Survey Responded') {
        functionAnalysis[normalizedFunction].completed++;
      } else if (record.Status === 'Survey Not responded') {
        functionAnalysis[normalizedFunction].nonResponders++;
      } else if (record.Status === 'Technical issue') {
        functionAnalysis[normalizedFunction].technicalIssues++;
      }
    });

    return Object.entries(functionAnalysis).map(([func, data]) => ({
      name: func,
      completed: data.completed,
      'Non-Responders': data.nonResponders,
      'Technical Issues': data.technicalIssues
    }));
  };

  const getDetailedResponses = (detailType) => {
    const currentData = getFilteredData();
    return currentData.data.filter(record => record.Status === detailType);
  };

  const calculateQuestionStats = () => {
    const currentData = getFilteredData();
    const surveyResponded = currentData.data.filter(r => r.Status === 'Survey Responded');

    const questionAnalysis = {
      "How well does VDart understand your staffing requirements and expectations?": {
        shortTitle: "Understanding of Requirements",
        responses: { "5 - star": 0, "4 - star": 0, "3 - star": 0, "2 - star": 0, "1 - star": 0, "NA": 0 }
      },
      "How would you rate the overall quality of candidates VDart has provided?": {
        shortTitle: "Candidate Quality",
        responses: { "5 - star": 0, "4 - star": 0, "3 - star": 0, "2 - star": 0, "1 - star": 0, "NA": 0 }
      },
      "How satisfied are you with VDart's speed in delivering candidates for your open roles?": {
        shortTitle: "Delivery Speed",
        responses: { "5 - star": 0, "4 - star": 0, "3 - star": 0, "2 - star": 0, "1 - star": 0, "NA": 0 }
      },
      "How effectively does VDart act as a strategic hiring partner rather than just a service provider?": {
        shortTitle: "Strategic Partnership",
        responses: { "5 - star": 0, "4 - star": 0, "3 - star": 0, "2 - star": 0, "1 - star": 0, "NA": 0 }
      },
      "How would you rate the responsiveness and communication of your VDart client Partner?": {
        shortTitle: "Communication & Responsiveness",
        responses: { "5 - star": 0, "4 - star": 0, "3 - star": 0, "2 - star": 0, "1 - star": 0, "NA": 0 }
      },
      "How likely is it that you would recommend VDart to a friend or colleague?": {
        shortTitle: "Net Promoter Score",
        responses: { "10": 0, "9": 0, "8": 0, "7": 0, "6": 0, "5": 0, "4": 0, "3": 0, "2": 0, "1": 0, "0": 0 }
      }
    };

    surveyResponded.forEach(record => {
      if (record.understanding && record.understanding !== 'Not Answered') {
        questionAnalysis["How well does VDart understand your staffing requirements and expectations?"].responses[record.understanding]++;
      }
      if (record.quality && record.quality !== 'Not Answered') {
        questionAnalysis["How would you rate the overall quality of candidates VDart has provided?"].responses[record.quality]++;
      }
      if (record.speed && record.speed !== 'Not Answered') {
        questionAnalysis["How satisfied are you with VDart's speed in delivering candidates for your open roles?"].responses[record.speed]++;
      }
      if (record.partnership && record.partnership !== 'Not Answered') {
        questionAnalysis["How effectively does VDart act as a strategic hiring partner rather than just a service provider?"].responses[record.partnership]++;
      }
      if (record.communication && record.communication !== 'Not Answered') {
        questionAnalysis["How would you rate the responsiveness and communication of your VDart client Partner?"].responses[record.communication]++;
      }
      if (record.npsScore !== null && record.npsScore !== undefined) {
        questionAnalysis["How likely is it that you would recommend VDart to a friend or colleague?"].responses[record.npsScore.toString()]++;
      }
    });

    // Calculate averages and NPS
    Object.keys(questionAnalysis).forEach(question => {
      const data = questionAnalysis[question];
      let totalScore = 0;
      let totalResponses = 0;

      if (question === "How likely is it that you would recommend VDart to a friend or colleague?") {
        Object.entries(data.responses).forEach(([score, count]) => {
          totalScore += parseInt(score) * count;
          totalResponses += count;
        });
        
        const promoters = (data.responses["10"] || 0) + (data.responses["9"] || 0);
        const passives = (data.responses["8"] || 0) + (data.responses["7"] || 0);
        const detractors = (data.responses["6"] || 0) + (data.responses["5"] || 0) + (data.responses["4"] || 0) + (data.responses["3"] || 0) + (data.responses["2"] || 0) + (data.responses["1"] || 0) + (data.responses["0"] || 0);
        
        data.promoters = promoters;
        data.passives = passives;
        data.detractors = detractors;
        data.npsScore = totalResponses > 0 ? ((promoters - detractors) / totalResponses) * 100 : 0;
      } else {
        Object.entries(data.responses).forEach(([rating, count]) => {
          if (rating !== "NA") {
            const score = parseInt(rating.split(' ')[0]);
            totalScore += score * count;
            totalResponses += count;
          }
        });
      }

      data.avgScore = totalResponses > 0 ? totalScore / totalResponses : 0;
      data.totalResponses = totalResponses;
    });

    return questionAnalysis;
  };

  const getQuestionResponses = (question, rating) => {
    const currentData = getFilteredData();
    const surveyResponded = currentData.data.filter(r => r.Status === 'Survey Responded');

    if (question === "How likely is it that you would recommend VDart to a friend or colleague?") {
      if (rating === 'promoters') {
        return surveyResponded.filter(r => r.npsScore >= 9);
      } else if (rating === 'passives') {
        return surveyResponded.filter(r => r.npsScore >= 7 && r.npsScore <= 8);
      } else if (rating === 'detractors') {
        return surveyResponded.filter(r => r.npsScore <= 6);
      } else {
        return surveyResponded.filter(r => r.npsScore === parseInt(rating));
      }
    }

    const questionKey = {
      "How well does VDart understand your staffing requirements and expectations?": "understanding",
      "How would you rate the overall quality of candidates VDart has provided?": "quality",
      "How satisfied are you with VDart's speed in delivering candidates for your open roles?": "speed",
      "How effectively does VDart act as a strategic hiring partner rather than just a service provider?": "partnership",
      "How would you rate the responsiveness and communication of your VDart client Partner?": "communication"
    }[question];

    return surveyResponded.filter(r => r[questionKey] === rating);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e8eaf6 100%)',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    },
    header: {
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb',
      padding: '32px 24px'
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '36px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280'
    },
    logo: {
      width: '120px',
      height: 'auto'
    },
    mainContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '32px 24px'
    },
    controlsCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '32px',
      border: '1px solid #e5e7eb'
    },
    controlsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    controlsTitle: {
      display: 'flex',
      alignItems: 'center'
    },
    iconContainer: {
      backgroundColor: '#e0e7ff',
      borderRadius: '50%',
      padding: '8px',
      marginRight: '12px'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '4px'
    },
    filterGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    filterLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    filterSelect: {
      width: '100%',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '10px 12px',
      fontSize: '14px',
      backgroundColor: '#ffffff',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      cursor: 'pointer'
    },
    kpiGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '32px'
    },
    kpiCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    },
    kpiHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px'
    },
    kpiValue: {
      fontSize: '28px',
      fontWeight: '800',
      color: '#1f2937',
      marginBottom: '4px'
    },
    kpiSubtitle: {
      fontSize: '14px',
      color: '#6b7280'
    },
    kpiClickHint: {
      fontSize: '12px',
      color: '#2563eb',
      marginTop: '4px',
      fontWeight: '500'
    },
    viewButtons: {
      display: 'flex',
      gap: '12px'
    },
    viewButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      border: 'none',
      cursor: 'pointer'
    },
    viewButtonActive: {
      backgroundColor: '#2563eb',
      color: 'white'
    },
    viewButtonInactive: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    },
    sectionCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '24px',
      border: '1px solid #e5e7eb'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '24px'
    },
    twoColumnLayout: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '32px'
    },
    threeColumnLayout: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '24px',
      marginBottom: '32px'
    },
    pieChartCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      border: '1px solid #e5e7eb'
    },
    pieChartTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '16px',
      textAlign: 'center'
    },
    pieChartLegend: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '12px',
      marginTop: '16px'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    legendColor: {
      width: '12px',
      height: '12px',
      borderRadius: '50%'
    },
    legendText: {
      fontSize: '14px',
      color: '#374151'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      maxWidth: '1000px',
      width: '100%',
      maxHeight: '80vh',
      overflowY: 'auto'
    },
    modalHeader: {
      padding: '20px',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#1f2937'
    },
    closeButton: {
      padding: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    modalBody: {
      padding: '20px'
    },
    responseGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    responseCard: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid #e2e8f0'
    },
    responseHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    responseUserInfo: {
      display: 'flex',
      alignItems: 'center'
    },
    responseAvatar: {
      backgroundColor: '#e0e7ff',
      borderRadius: '50%',
      padding: '8px',
      marginRight: '12px'
    },
    responseUserName: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#1f2937'
    },
    responseUserClient: {
      fontSize: '12px',
      color: '#6b7280'
    },
    responseStatus: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600'
    },
    responseDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '8px'
    },
    responseDetail: {
      display: 'flex',
      alignItems: 'center'
    },
    responseDetailIcon: {
      width: '14px',
      height: '14px',
      color: '#9ca3af',
      marginRight: '6px'
    },
    responseDetailText: {
      fontSize: '12px',
      color: '#6b7280'
    },
    responseRatings: {
      marginTop: '12px',
      paddingTop: '12px',
      borderTop: '1px solid #e5e7eb'
    },
    ratingsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
      gap: '8px'
    },
    ratingItem: {
      textAlign: 'center'
    },
    ratingLabel: {
      fontSize: '10px',
      fontWeight: '600',
      color: '#374151'
    },
    ratingValue: {
      fontSize: '12px',
      fontWeight: '700'
    },
    summary: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      margin: '20px 0',
      border: '2px solid #2563eb'
    },
    summaryText: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#2563eb'
    },
    buGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px'
    },
    buCard: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #e2e8f0',
      transition: 'all 0.2s ease'
    },
    buHeader: {
      textAlign: 'center',
      marginBottom: '16px'
    },
    buTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px'
    },
    buResponseRate: {
      fontSize: '32px',
      fontWeight: '800',
      color: '#4338ca',
      marginBottom: '4px'
    },
    buMetrics: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    buMetricRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    buMetricLabel: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500'
    },
    buMetricValue: {
      fontSize: '16px',
      fontWeight: '700'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      marginTop: '12px'
    },
    progressFill: {
      height: '100%',
      transition: 'width 0.5s ease',
      borderRadius: '4px'
    },
    functionCard: {
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid #bae6fd',
      marginBottom: '12px'
    },
    functionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    functionTitle: {
      fontSize: '14px',
      fontWeight: '700',
      color: '#0c4a6e'
    },
    functionResponseRate: {
      fontSize: '14px',
      fontWeight: '800',
      color: '#0369a1'
    },
    functionMetrics: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      color: '#64748b'
    },
    npsCard: {
      background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '24px',
      border: '1px solid #bfdbfe'
    },
    npsHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px'
    },
    npsTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '4px'
    },
    npsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px'
    },
    npsScoreSection: {
      textAlign: 'center',
      marginBottom: '20px'
    },
    npsScore: {
      fontSize: '64px',
      fontWeight: '800',
      color: '#2563eb',
      marginBottom: '8px'
    },
    npsDescription: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '4px'
    },
    npsScaleContainer: {
      background: 'linear-gradient(90deg, #fecaca 0%, #fef3c7 50%, #bbf7d0 100%)',
      borderRadius: '12px',
      padding: '12px'
    },
    npsScaleGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(11, 1fr)',
      gap: '4px',
      marginBottom: '8px'
    },
    npsScaleItem: {
      height: '40px',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: 'white'
    },
    npsCategories: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    npsCategoryCard: {
      borderRadius: '12px',
      padding: '16px',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    npsCategoryTitle: {
      fontSize: '16px',
      fontWeight: '700',
      marginBottom: '2px'
    },
    npsCategorySubtitle: {
      fontSize: '12px',
      opacity: 0.9
    },
    npsCategoryValue: {
      fontSize: '32px',
      fontWeight: '800'
    },
    questionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px'
    },
    questionCard: {
      background: 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #bfdbfe'
    },
    questionTitle: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#1e40af',
      marginBottom: '8px',
      lineHeight: '1.4'
    },
    questionSubtitle: {
      fontSize: '12px',
      color: '#6b7280',
      marginBottom: '12px',
      fontStyle: 'italic'
    },
    questionScore: {
      textAlign: 'center',
      marginBottom: '16px'
    },
    questionScoreValue: {
      fontSize: '36px',
      fontWeight: '800',
      color: '#2563eb',
      marginBottom: '4px'
    },
    questionScoreLabel: {
      fontSize: '12px',
      color: '#6b7280'
    },
    questionResponses: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },
    questionResponse: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    questionResponseLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      color: '#374151',
      fontWeight: '500'
    },
    questionResponseValue: {
      fontSize: '14px',
      fontWeight: '700',
      color: '#2563eb',
      cursor: 'pointer',
      textDecoration: 'underline'
    },
    starContainer: {
      display: 'flex',
      marginLeft: '6px'
    },
    star: {
      width: '10px',
      height: '10px',
      marginRight: '1px'
    },
    clientGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px'
    },
    clientCard: {
      background: 'linear-gradient(135deg, #f0fdf4 0%, #f7fee7 100%)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #bbf7d0',
      transition: 'all 0.2s ease'
    },
    clientTitle: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#166534',
      marginBottom: '12px'
    },
    clientStats: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    clientStat: {
      textAlign: 'center'
    },
    clientStatValue: {
      fontSize: '20px',
      fontWeight: '800',
      marginBottom: '4px'
    },
    clientStatLabel: {
      fontSize: '11px',
      color: '#6b7280',
      fontWeight: '500'
    },
    functionButtons: {
      display: 'flex',
      gap: '12px',
      marginBottom: '20px'
    },
    functionButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      border: 'none',
      cursor: 'pointer'
    },
    functionButtonActive: {
      backgroundColor: '#16a34a',
      color: 'white'
    },
    functionButtonInactive: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    },
    detailedAnalysisCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '24px',
      border: '1px solid #e5e7eb'
    },
    accordionItem: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      marginBottom: '12px',
      overflow: 'hidden'
    },
    accordionHeader: {
      padding: '16px',
      backgroundColor: '#f8fafc',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'background-color 0.2s ease'
    },
    accordionHeaderActive: {
      backgroundColor: '#e0f2fe'
    },
    accordionTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937'
    },
    accordionContent: {
      padding: '16px',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e5e7eb'
    },
    responseTable: {
      width: '100%',
      fontSize: '12px',
      borderCollapse: 'collapse'
    },
    responseTableHeader: {
      backgroundColor: '#f3f4f6',
      fontWeight: '600',
      color: '#374151'
    },
    responseTableCell: {
      padding: '8px',
      borderBottom: '1px solid #e5e7eb'
    },
    responseTableRow: {
      transition: 'background-color 0.2s ease'
    },
    responseTableRowHover: {
      backgroundColor: '#f8fafc'
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#ffffff',
          padding: '12px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ fontSize: '14px', color: entry.color, margin: '2px 0' }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const FunctionWiseChart = () => {
    const functionData = getFunctionWiseData();
    
    return (
      <div style={styles.pieChartCard}>
        <div style={styles.sectionHeader}>
          <div style={styles.controlsTitle}>
            <div style={{ ...styles.iconContainer, backgroundColor: '#dcfce7' }}>
              <BarChart3 style={{ width: '20px', height: '20px', color: '#16a34a' }} />
            </div>
            <div>
              <h3 style={styles.pieChartTitle}>
              Function-wise Response Analysis 
              <BarChart3 style={{ width: '16px', height: '16px', color: '#16a34a', marginLeft: '8px', display: 'inline-block' }} />
            </h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Breakdown by role type</p>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={functionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 12 }} />
            <YAxis tick={{ fill: '#374151', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} name="Completed" />
            <Bar dataKey="Non-Responders" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Non-Responders" />
            <Bar dataKey="Technical Issues" fill="#ec4899" radius={[4, 4, 0, 0]} name="Technical Issues" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const ResponseTypePieChart = ({ data }) => {
    const COLORS = ['#10b981', '#f59e0b', '#ec4899'];
    
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
      const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
      
      return percent > 0.05 ? (
        <text 
          x={x} 
          y={y} 
          fill="white" 
          textAnchor={x > cx ? 'start' : 'end'} 
          dominantBaseline="central"
          fontSize="14"
          fontWeight="600"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      ) : null;
    };

    return (
      <div style={styles.pieChartCard}>
        <div style={styles.sectionHeader}>
          <div style={styles.controlsTitle}>
            <div style={{ ...styles.iconContainer, backgroundColor: '#fce7f3' }}>
              <PieChartIcon style={{ width: '20px', height: '20px', color: '#ec4899' }} />
            </div>
            <div>
              <h3 style={styles.pieChartTitle}>Response Distribution 🎯</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Survey response breakdown</p>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        <div style={styles.pieChartLegend}>
          {data.map((item, index) => (
            <div key={index} style={styles.legendItem}>
              <div style={{ ...styles.legendColor, backgroundColor: item.color }}></div>
              <span style={styles.legendText}>{item.name}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ClientWiseChart = ({ data }) => {
    const pieData = [
      { name: 'Completed', value: data.completed, color: '#10b981' },
      { name: 'Non-Responders', value: data.nonResponders, color: '#f59e0b' },
      { name: 'Technical Issues', value: data.technicalIssues, color: '#ec4899' }
    ].filter(item => item.value > 0);

    return (
      <div style={{ height: '150px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const KPICard = ({ title, value, icon: Icon, color = "blue", subtitle = "", onClick = null, detailType = null }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const colorMap = {
      blue: { bg: '#dbeafe', icon: '#2563eb', border: '#3b82f6' },
      green: { bg: '#dcfce7', icon: '#16a34a', border: '#22c55e' },
      orange: { bg: '#fed7aa', icon: '#ea580c', border: '#f97316' },
      red: { bg: '#fecaca', icon: '#dc2626', border: '#ef4444' },
      purple: { bg: '#e9d5ff', icon: '#7c3aed', border: '#8b5cf6' },
      pink: { bg: '#fce7f3', icon: '#db2777', border: '#ec4899' }
    };

    const colors = colorMap[color];
    
    return (
      <div 
        style={{
          ...styles.kpiCard,
          borderLeft: `4px solid ${colors.border}`,
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: isHovered ? '0 8px 16px rgba(0, 0, 0, 0.15)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
          ...(onClick ? { cursor: 'pointer' } : {})
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick ? () => {
          setSelectedDetailType(detailType);
          setShowDetailModal(true);
        } : undefined}
      >
        <div style={styles.kpiHeader}>
          <div style={{ ...styles.iconContainer, backgroundColor: colors.bg }}>
            <Icon style={{ width: '20px', height: '20px', color: colors.icon }} />
          </div>
          <p style={{ fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {title}
          </p>
        </div>
        <p style={styles.kpiValue}>{value}</p>
        {subtitle && <p style={styles.kpiSubtitle}>{subtitle}</p>}
        
        {onClick && (
          <p style={styles.kpiClickHint}>
            Click to view details 
            <ChevronRight style={{ width: '12px', height: '12px', marginLeft: '4px', display: 'inline-block' }} />
          </p>
        )}
      </div>
    );
  };

  const NPSCard = ({ data }) => (
    <div style={styles.npsCard}>
      <div style={styles.npsHeader}>
        <div style={{ ...styles.iconContainer, backgroundColor: '#bfdbfe' }}>
          <Award style={{ width: '24px', height: '24px', color: '#2563eb' }} />
        </div>
        <div>
          <h3 style={styles.npsTitle}>
            Net Promoter Score 
            <Award style={{ width: '20px', height: '20px', color: '#2563eb', marginLeft: '8px', display: 'inline-block' }} />
          </h3>
          <p style={{ color: '#6b7280' }}>How likely are you to recommend VDart?</p>
        </div>
      </div>
      
      <div style={styles.npsGrid}>
        <div>
          <div style={styles.npsScoreSection}>
            <div style={styles.npsScore}>{data.npsScore?.toFixed(1) || 0}</div>
            <div style={styles.npsDescription}>
              {(data.npsScore || 0) >= 50 ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Excellent <Star style={{ width: '16px', height: '16px', marginLeft: '4px', fill: '#fbbf24', color: '#fbbf24' }} />
                </span>
              ) : (data.npsScore || 0) >= 0 ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Good <TrendingUp style={{ width: '16px', height: '16px', marginLeft: '4px', color: '#22c55e' }} />
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Needs Improvement <TrendingDown style={{ width: '16px', height: '16px', marginLeft: '4px', color: '#ef4444' }} />
                </span>
              )}
            </div>
            <div style={{ color: '#6b7280' }}>Based on {data.totalResponses || 0} responses</div>
          </div>
          
          <div style={styles.npsScaleContainer}>
            <div style={styles.npsScaleGrid}>
              {[0,1,2,3,4,5,6,7,8,9,10].map(score => (
                <div 
                  key={score}
                  style={{
                    ...styles.npsScaleItem,
                    backgroundColor: score <= 6 ? '#ef4444' : score <= 8 ? '#eab308' : '#22c55e'
                  }}
                  onClick={() => {
                    setSelectedSurveyQuestion("How likely is it that you would recommend VDart to a friend or colleague?");
                    setSelectedRating(score.toString());
                    setShowDetailModal(true);
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <div>{score}</div>
                  <div style={{ fontSize: '9px' }}>({data.responses?.[score.toString()] || 0})</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div style={styles.npsCategories}>
          <div 
            style={{
              ...styles.npsCategoryCard,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
            }}
            onClick={() => {
              setSelectedSurveyQuestion("How likely is it that you would recommend VDart to a friend or colleague?");
              setSelectedRating('promoters');
              setShowDetailModal(true);
            }}
          >
            <div>
              <div style={styles.npsCategoryTitle}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  Promoters <Star style={{ width: '16px', height: '16px', marginLeft: '4px', fill: 'white' }} />
                </span>
              </div>
              <div style={styles.npsCategorySubtitle}>Score 9-10</div>
            </div>
            <div style={styles.npsCategoryValue}>{data.promoters || 0}</div>
          </div>
          
          <div 
            style={{
              ...styles.npsCategoryCard,
              background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)'
            }}
            onClick={() => {
              setSelectedSurveyQuestion("How likely is it that you would recommend VDart to a friend or colleague?");
              setSelectedRating('passives');
              setShowDetailModal(true);
            }}
          >
            <div>
              <div style={styles.npsCategoryTitle}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  Passives <Activity style={{ width: '16px', height: '16px', marginLeft: '4px' }} />
                </span>
              </div>
              <div style={styles.npsCategorySubtitle}>Score 7-8</div>
            </div>
            <div style={styles.npsCategoryValue}>{data.passives || 0}</div>
          </div>
          
          <div 
            style={{
              ...styles.npsCategoryCard,
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
            }}
            onClick={() => {
              setSelectedSurveyQuestion("How likely is it that you would recommend VDart to a friend or colleague?");
              setSelectedRating('detractors');
              setShowDetailModal(true);
            }}
          >
            <div>
              <div style={styles.npsCategoryTitle}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  Detractors <TrendingDown style={{ width: '16px', height: '16px', marginLeft: '4px' }} />
                </span>
              </div>
              <div style={styles.npsCategorySubtitle}>Score 0-6</div>
            </div>
            <div style={styles.npsCategoryValue}>{data.detractors || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const DetailModal = ({ isOpen, onClose, detailType, question, rating }) => {
    if (!isOpen) return null;

    let responses = [];
    let title = '';

    if (detailType) {
      responses = getDetailedResponses(detailType);
      title = `${detailType} (${responses.length} records)`;
    } else if (question && rating) {
      responses = getQuestionResponses(question, rating);
      if (question === "How likely is it that you would recommend VDart to a friend or colleague?") {
        if (rating === 'promoters') title = `Promoters (Score 9-10) - ${responses.length} records`;
        else if (rating === 'passives') title = `Passives (Score 7-8) - ${responses.length} records`;
        else if (rating === 'detractors') title = `Detractors (Score 0-6) - ${responses.length} records`;
        else title = `Score ${rating} Responses - ${responses.length} records`;
      } else {
        title = `${rating} Responses - ${responses.length} records`;
      }
    }

    return (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>{title}</h2>
            <button 
              style={styles.closeButton}
              onClick={onClose}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <X style={{ width: '20px', height: '20px', color: '#6b7280' }} />
            </button>
          </div>
          {question && <p style={{ padding: '0 20px', color: '#6b7280', fontSize: '14px' }}>{question}</p>}
          
          <div style={styles.modalBody}>
            <div style={styles.responseGrid}>
              {responses.map((response, index) => (
                <div key={index} style={styles.responseCard}>
                  <div style={styles.responseHeader}>
                    <div style={styles.responseUserInfo}>
                      <div style={styles.responseAvatar}>
                        <User style={{ width: '20px', height: '20px', color: '#4f46e5' }} />
                      </div>
                      <div>
                        <h3 style={styles.responseUserName}>
                          {response["First Name"]} {response["Last Name"]}
                        </h3>
                        <p style={styles.responseUserClient}>{response.Client}</p>
                      </div>
                    </div>
                    <div style={styles.responseStatus}>
                      {response.npsScore ? `NPS: ${response.npsScore}` : response.Status}
                    </div>
                  </div>
                  
                  <div style={styles.responseDetails}>
                    <div style={styles.responseDetail}>
                      <Mail style={styles.responseDetailIcon} />
                      <span style={styles.responseDetailText}>{response.Email}</span>
                    </div>
                    <div style={styles.responseDetail}>
                      <Building2 style={styles.responseDetailIcon} />
                      <span style={styles.responseDetailText}>{response.BU} BU</span>
                    </div>
                    <div style={styles.responseDetail}>
                      <Briefcase style={styles.responseDetailIcon} />
                      <span style={styles.responseDetailText}>{response.Function}</span>
                    </div>
                    <div style={styles.responseDetail}>
                      <Star style={styles.responseDetailIcon} />
                      <span style={styles.responseDetailText}>{response.Client}</span>
                    </div>
                  </div>

                  {response.Status === 'Survey Responded' && (
                    <div style={styles.responseRatings}>
                      <div style={styles.ratingsGrid}>
                        <div style={styles.ratingItem}>
                          <div style={styles.ratingLabel}>Understanding</div>
                          <div style={{ ...styles.ratingValue, color: '#2563eb' }}>{response.understanding || 'N/A'}</div>
                        </div>
                        <div style={styles.ratingItem}>
                          <div style={styles.ratingLabel}>Quality</div>
                          <div style={{ ...styles.ratingValue, color: '#16a34a' }}>{response.quality || 'N/A'}</div>
                        </div>
                        <div style={styles.ratingItem}>
                          <div style={styles.ratingLabel}>Speed</div>
                          <div style={{ ...styles.ratingValue, color: '#eab308' }}>{response.speed || 'N/A'}</div>
                        </div>
                        <div style={styles.ratingItem}>
                          <div style={styles.ratingLabel}>Partnership</div>
                          <div style={{ ...styles.ratingValue, color: '#f97316' }}>{response.partnership || 'N/A'}</div>
                        </div>
                        <div style={styles.ratingItem}>
                          <div style={styles.ratingLabel}>Communication</div>
                          <div style={{ ...styles.ratingValue, color: '#ef4444' }}>{response.communication || 'N/A'}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DetailedAnalysisAccordion = () => {
    const getQuestionResponsesDetailed = (question) => {
      const responses = realExcelData.filter(row => {
        const questionKey = {
          "How well does VDart understand your staffing requirements and expectations?": "understanding",
          "How would you rate the overall quality of candidates VDart has provided?": "quality",
          "How satisfied are you with VDart's speed in delivering candidates for your open roles?": "speed",
          "How effectively does VDart act as a strategic hiring partner rather than just a service provider?": "partnership",
          "How would you rate the responsiveness and communication of your VDart client Partner?": "communication"
        }[question];

        const value = row[questionKey];
        return value && value.trim() !== '' && value !== 'NA' && value !== 'Not Answered' && row.Status === 'Survey Responded';
      });
      
      const responseCounts = {};
      const responseDetails = {};
      
      responses.forEach(row => {
        const questionKey = {
          "How well does VDart understand your staffing requirements and expectations?": "understanding",
          "How would you rate the overall quality of candidates VDart has provided?": "quality",
          "How satisfied are you with VDart's speed in delivering candidates for your open roles?": "speed",
          "How effectively does VDart act as a strategic hiring partner rather than just a service provider?": "partnership",
          "How would you rate the responsiveness and communication of your VDart client Partner?": "communication"
        }[question];

        const response = row[questionKey];
        responseCounts[response] = (responseCounts[response] || 0) + 1;
        
        if (!responseDetails[response]) {
          responseDetails[response] = [];
        }
        
        responseDetails[response].push({
          email: row.Email || 'N/A',
          firstName: row['First Name'] || 'N/A',
          lastName: row['Last Name'] || 'N/A',
          client: row.Client || 'N/A',
          function: row.Function || 'N/A',
          bu: row.BU || 'N/A'
        });
      });
      
      return {
        totalResponses: responses.length,
        responses: Object.entries(responseCounts)
          .map(([response, count]) => ({
            response,
            count,
            percentage: responses.length > 0 ? ((count / responses.length) * 100).toFixed(1) : '0',
            details: responseDetails[response] || []
          }))
          .sort((a, b) => b.count - a.count)
      };
    };

    const questionsToAnalyze = [
      "How well does VDart understand your staffing requirements and expectations?",
      "How would you rate the overall quality of candidates VDart has provided?",
      "How satisfied are you with VDart's speed in delivering candidates for your open roles?",
      "How effectively does VDart act as a strategic hiring partner rather than just a service provider?",
      "How would you rate the responsiveness and communication of your VDart client Partner?"
    ];

    return (
      <div style={styles.detailedAnalysisCard}>
        <div style={styles.sectionHeader}>
          <div style={styles.controlsTitle}>
            <div style={{ ...styles.iconContainer, backgroundColor: '#f3e8ff' }}>
              <FileText style={{ width: '20px', height: '20px', color: '#7c3aed' }} />
            </div>
            <div>
              <h3 style={styles.sectionTitle}>
                Detailed Survey Analysis 
                <Eye style={{ width: '16px', height: '16px', color: '#7c3aed', marginLeft: '8px', display: 'inline-block' }} />
              </h3>
              <p style={{ color: '#6b7280' }}>In-depth question-by-question breakdown</p>
            </div>
          </div>
        </div>

        <div>
          {questionsToAnalyze.map((question) => {
            const questionData = getQuestionResponsesDetailed(question);
            const isExpanded = expandedQuestion === question;
            const surveyQuestionData = surveyQuestions[question];
            
            return (
              <div key={question} style={styles.accordionItem}>
                <div 
                  style={{
                    ...styles.accordionHeader,
                    ...(isExpanded ? styles.accordionHeaderActive : {})
                  }}
                  onClick={() => setExpandedQuestion(isExpanded ? null : question)}
                >
                  <div>
                    <h4 style={styles.accordionTitle}>{surveyQuestionData?.shortTitle || 'Question'}</h4>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>
                      {question}
                    </p>
                    <p style={{ fontSize: '12px', color: '#2563eb', margin: '4px 0 0 0', fontWeight: '600' }}>
                      📊 {questionData.totalResponses} responses
                    </p>
                  </div>
                  {isExpanded ? <ChevronUp /> : <ChevronDown />}
                </div>
                
                {isExpanded && (
                  <div style={styles.accordionContent}>
                    <div style={styles.twoColumnLayout}>
                      <div>
                        <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Response Distribution</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {questionData.responses.map((item, index) => {
                            const responseKey = `${question}-${item.response}`;
                            const isResponseExpanded = expandedResponse === responseKey;
                            
                            return (
                              <div key={index} style={styles.accordionItem}>
                                <div 
                                  style={{
                                    ...styles.accordionHeader,
                                    padding: '12px',
                                    ...(isResponseExpanded ? styles.accordionHeaderActive : {})
                                  }}
                                  onClick={() => setExpandedResponse(isResponseExpanded ? null : responseKey)}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.response}</span>
                                    {item.response !== "NA" && item.response.includes('star') && (
                                      <div style={styles.starContainer}>
                                        {[...Array(parseInt(item.response.split(' ')[0]))].map((_, i) => (
                                          <Star key={i} style={{ ...styles.star, fill: '#fbbf24', color: '#fbbf24' }} />
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '700' }}>{item.count}</span>
                                    <span style={{ fontSize: '12px', color: '#6b7280' }}>({item.percentage}%)</span>
                                    {isResponseExpanded ? <ChevronUp /> : <ChevronDown />}
                                  </div>
                                </div>
                                
                                {isResponseExpanded && (
                                  <div style={styles.accordionContent}>
                                    <h6 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                                      Respondents who selected "{item.response}" ({item.count} total)
                                    </h6>
                                    
                                    <table style={styles.responseTable}>
                                      <thead>
                                        <tr style={styles.responseTableHeader}>
                                          <th style={styles.responseTableCell}>Name</th>
                                          <th style={styles.responseTableCell}>Client</th>
                                          <th style={styles.responseTableCell}>Role</th>
                                          <th style={styles.responseTableCell}>BU</th>
                                          <th style={styles.responseTableCell}>Email</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {item.details.map((detail, detailIndex) => (
                                          <tr key={detailIndex} style={styles.responseTableRow}>
                                            <td style={styles.responseTableCell}>
                                              <strong>{detail.firstName} {detail.lastName}</strong>
                                            </td>
                                            <td style={styles.responseTableCell}>{detail.client}</td>
                                            <td style={styles.responseTableCell}>{detail.function}</td>
                                            <td style={styles.responseTableCell}>{detail.bu}</td>
                                            <td style={styles.responseTableCell}>{detail.email}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div>
                        <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Visual Distribution</h5>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={questionData.responses.slice(0, 5)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="response" angle={-45} textAnchor="end" height={80} fontSize={10} />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const currentData = getFilteredData();
  const questionStats = calculateQuestionStats();
  const buFunctionAnalysis = getBuFunctionAnalysis();
  const clientWiseData = getClientWiseData();

  const getResponseTypeData = () => {
    return [
      { name: 'Completed Surveys', value: currentData.totalSurveyReceived, color: '#10b981' },
      { name: 'Non-Responders', value: currentData.totalNonResponders, color: '#f59e0b' },
      { name: 'Technical Issues', value: currentData.totalTechnicalIssues, color: '#ec4899' }
    ];
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', color: '#6b7280' }}></div>
            <div style={{ fontSize: '8px', fontWeight: '700', color: '#374151', width: '120px', height: 'auto'}}>
              <img 
                src='https://github.com/Sweety-Vigneshg/Vdart_Asset_Images/blob/main/vdartorginallogo.png?raw=true' 
                style={styles.logo} 
                alt="VDart Logo"
              />
            </div>
          </div>
          <div>
            <h1 style={styles.title}>
              VDart Client Satisfaction Dashboard 
              <TrendingUp style={{ width: '32px', height: '32px', color: '#2563eb', marginLeft: '12px', display: 'inline-block' }} />
            </h1>
            <p style={styles.subtitle}>Real-time insights into client feedback and satisfaction</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>Total Records</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#2563eb' }}>{realExcelData.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Controls */}
        <div style={styles.controlsCard}>
          <div style={styles.controlsHeader}>
            <div style={styles.controlsTitle}>
              <div style={{ ...styles.iconContainer, backgroundColor: '#e0e7ff' }}>
                <Settings style={{ width: '20px', height: '20px', color: '#7c3aed' }} />
              </div>
              <div>
                <h3 style={styles.sectionTitle}>
                  Dashboard Controls 
                  <Activity style={{ width: '16px', height: '16px', color: '#7c3aed', marginLeft: '8px', display: 'inline-block' }} />
                </h3>
                <p style={{ color: '#6b7280' }}>Filter and customize your view</p>
              </div>
            </div>
            <div style={styles.viewButtons}>
              <button 
                style={{
                  ...styles.viewButton,
                  ...(selectedView === 'overview' ? styles.viewButtonActive : styles.viewButtonInactive)
                }}
                onClick={() => setSelectedView('overview')}
              >
                <TrendingUp style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                Overview
              </button>
              <button 
                style={{
                  ...styles.viewButton,
                  ...(selectedView === 'bu-function' ? styles.viewButtonActive : styles.viewButtonInactive)
                }}
                onClick={() => setSelectedView('bu-function')}
              >
                <Award style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                BU & Function Analysis
              </button>
              <button 
                style={{
                  ...styles.viewButton,
                  ...(selectedView === 'client-wise' ? styles.viewButtonActive : styles.viewButtonInactive)
                }}
                onClick={() => setSelectedView('client-wise')}
              >
                <Target style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                Client Analysis
              </button>
              <button 
                style={{
                  ...styles.viewButton,
                  ...(selectedView === 'detailed-analysis' ? styles.viewButtonActive : styles.viewButtonInactive)
                }}
                onClick={() => setSelectedView('detailed-analysis')}
              >
                <Eye style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                Detailed Analysis
              </button>
            </div>
          </div>
          
          <div style={styles.filterGrid}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Business Unit</label>
              <select 
                style={styles.filterSelect}
                value={selectedFilter.bu}
                onChange={(e) => setSelectedFilter({...selectedFilter, bu: e.target.value})}
              >
                <option value="All">All Business Units</option>
                <option value="Oliver">Oliver BU (97 contacts)</option>
                <option value="Rohit">Rohit BU (58 contacts)</option>
                <option value="Nambu">Nambu BU (48 contacts)</option>
                <option value="Sidd">Sidd BU (48 contacts)</option>
              </select>
            </div>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Department</label>
              <select 
                style={styles.filterSelect}
                value={selectedFilter.department}
                onChange={(e) => setSelectedFilter({...selectedFilter, department: e.target.value})}
              >
                <option value="All">All Departments</option>
                <option value="Tag Lead">Tag Lead</option>
                <option value="Procurement">Procurement</option>
              </select>
            </div>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Actions</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ flex: 1, backgroundColor: '#2563eb', color: 'white', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                  <Download style={{ width: '16px', height: '16px', margin: '0 auto', display: 'block' }} />
                </button>
                <button style={{ flex: 1, backgroundColor: '#16a34a', color: 'white', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                  <Share2 style={{ width: '16px', height: '16px', margin: '0 auto', display: 'block' }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {selectedView === 'overview' ? (
          <>
            {/* KPI Cards */}
            <div style={styles.kpiGrid}>
              <KPICard 
                title="Total Surveys Sent" 
                value={currentData.totalSurveySent.toLocaleString()} 
                icon={Send}
                color="blue"
                subtitle="Based on actual Excel records"
              />
              <KPICard 
                title="Completed Surveys" 
                value={currentData.totalSurveyReceived.toLocaleString()} 
                icon={MessageSquare}
                color="green"
                subtitle="Successfully completed"
                onClick={true}
                detailType="Survey Responded"
              />
              <KPICard 
                title="Non-Responders" 
                value={currentData.totalNonResponders.toLocaleString()} 
                icon={Users}
                color="orange"
                subtitle="No response received"
                onClick={true}
                detailType="Survey Not responded"
              />
              <KPICard 
                title="Technical Issues" 
                value={currentData.totalTechnicalIssues.toLocaleString()} 
                icon={AlertTriangle}
                color="red"
                subtitle="Technical problems"
                onClick={true}
                detailType="Technical issue"
              />
              <KPICard 
                title="Response Rate" 
                value={`${currentData.responseRate.toFixed(1)}%`} 
                icon={Target}
                color="purple"
                subtitle="Overall completion rate"
              />
              <KPICard 
                title="Avg Satisfaction" 
                value={`${(questionStats["How well does VDart understand your staffing requirements and expectations?"]?.avgScore || 0).toFixed(1)}/5`} 
                icon={Heart}
                color="pink"
                subtitle="Client satisfaction score"
              />
            </div>

            {/* Charts Section */}
            <div style={{ marginBottom: '32px' }}>
              <FunctionWiseChart />
            </div>

            {/* NPS Section */}
            <NPSCard data={questionStats["How likely is it that you would recommend VDart to a friend or colleague?"]} />

            {/* Survey Question Analysis */}
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <div style={styles.controlsTitle}>
                  <div style={{ ...styles.iconContainer, backgroundColor: '#e0e7ff' }}>
                    <BarChart3 style={{ width: '20px', height: '20px', color: '#7c3aed' }} />
                  </div>
                  <div>
                    <h3 style={styles.sectionTitle}>
                      Survey Question Analysis 
                      <FileText style={{ width: '16px', height: '16px', color: '#7c3aed', marginLeft: '8px', display: 'inline-block' }} />
                    </h3>
                    <p style={{ color: '#6b7280' }}>Detailed breakdown of all survey questions</p>
                  </div>
                </div>
              </div>
              
              <div style={styles.questionGrid}>
                {Object.entries(questionStats).filter(([key]) => key !== "How likely is it that you would recommend VDart to a friend or colleague?").map(([question, data]) => (
                  <div key={question} style={styles.questionCard}>
                    <h4 style={styles.questionTitle}>{data.shortTitle}</h4>
                    <p style={styles.questionSubtitle}>{surveyQuestions[question]?.question}</p>
                    
                    <div style={styles.questionScore}>
                      <div style={styles.questionScoreValue}>{data.avgScore.toFixed(1)}</div>
                      <div style={styles.questionScoreLabel}>Average Score</div>
                    </div>
                    
                    <div style={styles.questionResponses}>
                      {Object.entries(data.responses).map(([rating, count]) => (
                        <div key={rating} style={styles.questionResponse}>
                          <div style={styles.questionResponseLabel}>
                            <span>{rating}</span>
                            {rating !== "NA" && (
                              <div style={styles.starContainer}>
                                {[...Array(parseInt(rating.split(' ')[0]))].map((_, i) => (
                                  <Star key={i} style={{ ...styles.star, fill: '#fbbf24', color: '#fbbf24' }} />
                                ))}
                              </div>
                            )}
                          </div>
                          <span 
                            style={styles.questionResponseValue}
                            onClick={() => {
                              setSelectedSurveyQuestion(question);
                              setSelectedRating(rating);
                              setShowDetailModal(true);
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                            onMouseLeave={(e) => e.target.style.color = '#2563eb'}
                          >
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : selectedView === 'bu-function' ? (
          <div style={styles.sectionCard}>
            <div style={styles.sectionHeader}>
              <div style={styles.controlsTitle}>
                <div style={{ ...styles.iconContainer, backgroundColor: '#dbeafe' }}>
                  <Building2 style={{ width: '20px', height: '20px', color: '#2563eb' }} />
                </div>
                <div>
                  <h3 style={styles.sectionTitle}>
                    Business Unit & Function Analysis 
                    <Building2 style={{ width: '16px', height: '16px', color: '#2563eb', marginLeft: '8px', display: 'inline-block' }} />
                  </h3>
                  <p style={{ color: '#6b7280' }}>Detailed breakdown by BU and function</p>
                </div>
              </div>
            </div>
            
            <div style={styles.functionButtons}>
              <button 
                style={{
                  ...styles.functionButton,
                  ...(selectedFunctionType === 'All' ? styles.functionButtonActive : styles.functionButtonInactive)
                }}
                onClick={() => setSelectedFunctionType('All')}
              >
                All Functions
              </button>
              <button 
                style={{
                  ...styles.functionButton,
                  ...(selectedFunctionType === 'Tag Lead' ? styles.functionButtonActive : styles.functionButtonInactive)
                }}
                onClick={() => setSelectedFunctionType('Tag Lead')}
              >
                Tag Lead
              </button>
              <button 
                style={{
                  ...styles.functionButton,
                  ...(selectedFunctionType === 'Procurement' ? styles.functionButtonActive : styles.functionButtonInactive)
                }}
                onClick={() => setSelectedFunctionType('Procurement')}
              >
                Procurement
              </button>
            </div>
            
            <div style={styles.buGrid}>
              {Object.entries(buFunctionAnalysis).filter(([key, data]) => 
                selectedFunctionType === 'All' || data.function === selectedFunctionType
              ).map(([key, data]) => (
                <div key={key} style={styles.buCard}>
                  <div style={styles.buHeader}>
                    <h4 style={styles.buTitle}>{data.bu} BU - {data.function}</h4>
                    <div style={styles.buResponseRate}>{data.responseRate.toFixed(1)}%</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Response Rate</div>
                  </div>
                  
                  <div style={styles.buMetrics}>
                    <div style={styles.buMetricRow}>
                      <span style={styles.buMetricLabel}>Total Sent</span>
                      <span style={{ ...styles.buMetricValue, color: '#2563eb' }}>{data.totalSent}</span>
                    </div>
                    <div style={styles.buMetricRow}>
                      <span style={styles.buMetricLabel}>Completed</span>
                      <span style={{ ...styles.buMetricValue, color: '#16a34a' }}>{data.surveyCompleted}</span>
                    </div>
                    <div style={styles.buMetricRow}>
                      <span style={styles.buMetricLabel}>Non-Responders</span>
                      <span style={{ ...styles.buMetricValue, color: '#f97316' }}>{data.nonResponders}</span>
                    </div>
                    <div style={styles.buMetricRow}>
                      <span style={styles.buMetricLabel}>Technical Issues</span>
                      <span style={{ ...styles.buMetricValue, color: '#ef4444' }}>{data.technicalIssues}</span>
                    </div>
                  </div>
                  
                  <div style={styles.progressBar}>
                    <div 
                      style={{
                        ...styles.progressFill,
                        width: `${Math.min(data.responseRate, 100)}%`,
                        backgroundColor: data.responseRate >= 30 ? '#22c55e' : 
                                       data.responseRate >= 20 ? '#eab308' : 
                                       data.responseRate >= 10 ? '#f97316' : '#ef4444'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : selectedView === 'client-wise' ? (
          <div style={styles.sectionCard}>
            <div style={styles.sectionHeader}>
              <div style={styles.controlsTitle}>
                <div style={{ ...styles.iconContainer, backgroundColor: '#dcfce7' }}>
                  <Users style={{ width: '20px', height: '20px', color: '#16a34a' }} />
                </div>
                <div>
                  <h3 style={styles.sectionTitle}>
                    Client-wise Analysis 
                    <Users style={{ width: '16px', height: '16px', color: '#16a34a', marginLeft: '8px', display: 'inline-block' }} />
                  </h3>
                  <p style={{ color: '#6b7280' }}>Detailed breakdown by client organization</p>
                </div>
              </div>
            </div>
            
            <div style={styles.clientGrid}>
              {Object.entries(clientWiseData).map(([client, data]) => (
                <div key={client} style={styles.clientCard}>
                  <h4 style={styles.clientTitle}>{client}</h4>
                  
                  <div style={styles.clientStats}>
                    <div style={styles.clientStat}>
                      <div style={{ ...styles.clientStatValue, color: '#2563eb' }}>{data.totalSent}</div>
                      <div style={styles.clientStatLabel}>Total Sent</div>
                    </div>
                    <div style={styles.clientStat}>
                      <div style={{ ...styles.clientStatValue, color: '#16a34a' }}>{data.completed}</div>
                      <div style={styles.clientStatLabel}>Completed</div>
                    </div>
                    <div style={styles.clientStat}>
                      <div style={{ ...styles.clientStatValue, color: '#f97316' }}>{data.nonResponders}</div>
                      <div style={styles.clientStatLabel}>Non-Responders</div>
                    </div>
                    <div style={styles.clientStat}>
                      <div style={{ ...styles.clientStatValue, color: '#ef4444' }}>{data.technicalIssues}</div>
                      <div style={styles.clientStatLabel}>Technical Issues</div>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                      Response Rate: {data.responseRate.toFixed(1)}%
                    </div>
                    <div style={styles.progressBar}>
                      <div 
                        style={{
                          ...styles.progressFill,
                          width: `${Math.min(data.responseRate, 100)}%`,
                          backgroundColor: data.responseRate >= 30 ? '#22c55e' : 
                                         data.responseRate >= 20 ? '#eab308' : 
                                         data.responseRate >= 10 ? '#f97316' : '#ef4444'
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <ClientWiseChart data={data} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <DetailedAnalysisAccordion />
        )}
      </div>

      <DetailModal 
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        detailType={selectedDetailType}
        question={selectedSurveyQuestion}
        rating={selectedRating}
      />
    </div>
  );
};

export default VDartSatisfactionDashboard;
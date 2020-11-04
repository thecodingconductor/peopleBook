from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import StaleElementReferenceException, NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
from sqlalchemy import exc
from bs4 import BeautifulSoup
import re
import os
import time
import json
from arrays import ORGANIZATIONS, PEOPLE




def parse_org():
    text_fields = driver.find_element_by_id("fontevaDetailFields")
    text_list = text_fields.text.splitlines()
    org_name = text_list[0]
    org_website = text_list[1]
    org_group = text_list[3]
    org_phone = text_list[4]
    org_address = text_list[5]
    org_dict = {
        "name": org_name,
        "website": org_website,
        "group": org_group,
        "phone": org_phone,
        "address": org_address
    }
    ORGANIZATIONS.append(org_dict)
    print(ORGANIZATIONS)

    # append_orgs(org_dict)
    return org_name

def parse_people(org_name):

    total_page_number = int(driver.find_element_by_css_selector('#RelatedIndividualsTableView > div > div.slds-size--1-of-1.slds-m-top--medium > div > div > div:nth-child(4) > span.slds-m-left--x-small.fonteva-slds-text').text)
    current_page_number = int(driver.find_element_by_class_name("slds-input.form-control.col-md-8.input.uiInputSmartNumber.uiInput.uiInputNumber.uiInput--default.uiInput--input").get_attribute("value"))
    print(f"current page number>{current_page_number}, total page number>{total_page_number}")
    next_page = driver.find_element_by_css_selector("#RelatedIndividualsTableView > div > div.slds-size--1-of-1.slds-m-top--medium > div > div > button.slds-button.slds-button_neutral.slds-m-left--small.slds-align-middle.fonteva-button--icon.slds-p-horizontal--small")
    
    for page in range(1, total_page_number+1):

        people = driver.find_elements_by_css_selector('.fonteva-record.slds-table--card.slds-theme--default')
        print(f"page is: {page}")
        print(f"total page number is: {total_page_number}")
       
        for p in people:
            print('inside people loop')
            children = p.find_elements_by_tag_name("td")
            try:
                last_name = children[0].text
                first_name =  children[1].text
                role = children[2].text
                contact_dict = {
                    "name": f"{first_name} {last_name}",
                    "organization": org_name,
                    "position": role
                }
                PEOPLE.append(contact_dict)
            except:
                continue

            



        print(PEOPLE)
        
            # append_people(contact_dict)
        
        if page == total_page_number:
            ("WHAT IS HAPPENING")
            print('IF STATEMENT?')
            driver.execute_script("window.scrollTo(0, 0)")
            
            try:
                button = driver.find_element_by_css_selector('#backToResultsBtn > button')
                button.click()
            except:
                fail_button = driver.find_element_by_class_name('slds-align-middle.slds-text-heading_x-small.fonteva-slds-hero--heading.slds-truncate')
                fail_button.click()
                
        else:
            next_page.click()
            time.sleep(1)
            print("From Parse Page info")
            
        
def append_entries(orgs, people):
    json_orgs = json.dumps(orgs, indent=4)
    json_people = json.dumps(people, indent=4)
    with open("./organizations.json", "w") as outfile:
        outfile.write(json_orgs)
        

    with open("./people.json", "w") as outfile:
        outfile.write(json_people)


def append_orgs(orgs):
    json_orgs = json.dumps(orgs, indent=4)
    with open("./organizations.json", "a") as outfile:
        outfile.write(json_orgs)
        driver.implicitly_wait(30)

def append_people(people):
    json_people = json.dumps(people, indent=4)
    with open("./people.json", "a") as outfile:
        outfile.write(json_people)

def single_tile():
    org_value = parse_org()
    print(org_value)
    parse_people(org_value)


def tile_loop():
    current_tiles = driver.find_elements_by_css_selector('#TileListView > div > div > div > div > div')
    for tile in range(len(current_tiles)-1):
       
        loop_tiles = driver.find_elements_by_css_selector('#TileListView > div > div > div > div > div') 
        loop_tiles[tile].click()
        org_value = parse_org()
        parse_people(org_value)
        try:
            button = driver.find_element_by_css_selector('#backToResultsBtn > button')
            button.click()
        except:
            fail_button = driver.find_element_by_class_name('slds-align-middle.slds-text-heading_x-small.fonteva-slds-hero--heading.slds-truncate')
            fail_button.click()
        time.sleep(2)
        current_tiles = driver.find_elements_by_css_selector('#TileListView > div > div > div > div > div') 
    
def tile_loop_ext():
    current_tiles = driver.find_elements_by_css_selector('#TileListView > div > div > div > div > div')
    for tile in range(len(current_tiles)-1):
        time.sleep(1)
        try:
            loop_tiles = driver.find_elements_by_css_selector('#TileListView > div > div > div > div > div') 
            loop_tiles[tile].click()
        except:
            time.sleep(2)
            loop_tiles = driver.find_elements_by_css_selector('#TileListView > div > div > div > div > div') 
            loop_tiles[tile].click()
       
        org_value = parse_org()
        parse_people(org_value)
        try:
            button = driver.find_element_by_css_selector('#backToResultsBtn > button')
            button.click()
            time.sleep(1)
        except:
            fail_button = driver.find_element_by_class_name('slds-align-middle.slds-text-heading_x-small.fonteva-slds-hero--heading.slds-truncate')
            fail_button.click()
            time.sleep(1)
        for i in range(1):
            next_org_page = driver.find_element_by_css_selector("#TileListView > div > div > div > div > div.slds-size--1-of-1.slds-m-top--medium.slds-grid_align-center > div > button.slds-button.slds-button_neutral.slds-m-left--small.slds-align-middle.fonteva-button--icon.slds-p-horizontal--small")
            next_org_page.click()
            time.sleep(1)


url = "https://americanorchestras.org"

driver = webdriver.Chrome()
driver.implicitly_wait(20)
driver.get(url)
driver.maximize_window()

login = driver.find_element_by_xpath('//*[@id="newHomeSide"]/a')
login.click()

username = driver.find_element_by_xpath('//*[@id="j_id0:j_id1:j_id2:form:usr-pwd-auth"]/div[1]/input')
username.send_keys('tristan.raissherman@gmail.com')

pword = driver.find_element_by_xpath('//*[@id="j_id0:j_id1:j_id2:form:usr-pwd-auth"]/div[2]/input')
pword.send_keys('PassacagliaOp1')

login_btn = driver.find_element_by_xpath('//*[@id="j_id0:j_id1:j_id2:form:usr-pwd-auth"]/div[3]/input')
login_btn.click()

member_portal = driver.find_element_by_xpath('//*[@id="newHomeSide"]/div[1]/p/a[2]')
member_portal.click()

directory_open = driver.find_element_by_link_text('Organizational Directory')
directory_open.click()

#STUCK NOT OPENING THE NEW TAB.
driver.switch_to.window(driver.window_handles[1])


time.sleep(3)
try:
    # open_more = driver.find_element_by_xpath('//*[@id="Organization_Type__c"]/div[13]/a')
    open_more = driver.find_element_by_xpath('//*[@id="Organization_Type__c"]/div[13]/a')
    open_more.click()
    time.sleep(1)
    
except:
    fail_more = driver.find_element_by_class_name("slds-text-body_medium.slds-font-weight--bold.fonteva-slds-text")
    fail_more.click()
    time.sleep(1)

for x in range(1, 7):
    time.sleep(3)
    group_name = f"Group {x}"
    group_title = driver.find_element_by_xpath("//*[contains(text(), '{}')]".format(group_name))
    group_title.click()
    
driver.execute_script("window.scrollTo(0, 0)")

# tile_loop()


# def parse_single():
    

#     # ORGANIZATIONS.append(org_dict)

#     people = driver.find_elements_by_css_selector('.fonteva-record.slds-table--card.slds-theme--default')
#     for p in people:
#         children = p.find_elements_by_tag_name("td")
#         last_name = children[0].text
#         first_name =  children[1].text
#         role = children[2].text
#         contact_dict = {
#             "name": f"{first_name} {last_name}",
#             "organization": org_name,
#             "position": role
#         }


#         PEOPLE.append(contact_dict)
#         print(PEOPLE)

#     append_entries(org_dict, contact_dict)
    
#     total_page_number = int(driver.find_element_by_css_selector('#RelatedIndividualsTableView > div > div.slds-size--1-of-1.slds-m-top--medium > div > div > div:nth-child(4) > span.slds-m-left--x-small.fonteva-slds-text').text)
#     current_page_number = int(driver.find_element_by_class_name("slds-input.form-control.col-md-8.input.uiInputSmartNumber.uiInput.uiInputNumber.uiInput--default.uiInput--input").get_attribute("value"))
#     print(f"current page number>{current_page_number}, total page number>{total_page_number}")
#     next_page = driver.find_element_by_css_selector("button.slds-button.slds-button_neutral.slds-m-left--small.slds-align-middle.fonteva-button--icon.slds-p-horizontal--small")

#     if current_page_number == total_page_number:
#         driver.execute_script("window.scrollTo(0, 0)")
#         try:
#             button = driver.find_element_by_css_selector('#backToResultsBtn > button')
#             button.click()
#         except:
#             fail_button = driver.find_element_by_class_name('slds-align-middle.slds-text-heading_x-small.fonteva-slds-hero--heading.slds-truncate')
#             fail_button.click()
#         time.sleep(3)
#         return False
    
#     try:
#         next_page.click()
#         print("From Parse Page info")
#         driver.implicitly_wait(10)
#         parse_single()
#     except:
#         driver.execute_script("window.scrollTo(0, 0)")
#         return False
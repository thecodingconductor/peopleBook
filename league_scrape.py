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


ORGANIZATIONS = []
PEOPLE = []

def parse_single():
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

    people = driver.find_elements_by_css_selector('.fonteva-record.slds-table--card.slds-theme--default')
    for p in people:
        children = p.find_elements_by_tag_name("td")
        last_name = children[0].text
        first_name =  children[1].text
        role = children[2].text
        contact_dict = {
            "name": f"{first_name} {last_name}",
            "organization": org_name,
            "position": role
        }


        PEOPLE.append(contact_dict)
        print(PEOPLE)





def parse_page_info():
    driver.implicitly_wait(10)
    time.sleep(1)
    text_fields = driver.find_element_by_id("fontevaDetailFields")
    text_list = text_fields.text.splitlines()
    org_name = text_list[0]
    org_website = text_list[1]
    org_group = text_list[3]
    org_phone = text_list[4]
    org_address = text_list[5]
    #Create dictionary for organization
    org_dict = {
        "name": org_name,
        "website": org_website,
        "group": org_group,
        "phone": org_phone,
        "address": org_address
    }

    ORGANIZATIONS.append(org_dict)
    print(ORGANIZATIONS)
    # Create JSON object out of dictionary
  
   

    people = driver.find_elements_by_css_selector('.fonteva-record.slds-table--card.slds-theme--default')
    for p in people:
        children = p.find_elements_by_tag_name("td")
        last_name = children[0].text
        first_name =  children[1].text
        role = children[2].text
        contact_dict = {
            "name": f"{first_name} {last_name}",
            "organization": org_name,
            "position": role
        }


        PEOPLE.append(contact_dict)
        print(PEOPLE)

        
    
    total_page_number = int(driver.find_element_by_css_selector('#RelatedIndividualsTableView > div > div.slds-size--1-of-1.slds-m-top--medium > div > div > div:nth-child(4) > span.slds-m-left--x-small.fonteva-slds-text').text)
    current_page_number = int(driver.find_element_by_class_name("slds-input.form-control.col-md-8.input.uiInputSmartNumber.uiInput.uiInputNumber.uiInput--default.uiInput--input").get_attribute("value"))
    print(f"current page number>{current_page_number}, total page number>{total_page_number}")
    next_page = driver.find_element_by_css_selector("button.slds-button.slds-button_neutral.slds-m-left--small.slds-align-middle.fonteva-button--icon.slds-p-horizontal--small")

    if current_page_number == total_page_number:
        driver.execute_script("window.scrollTo(0, 0)")
        try:
            button = driver.find_element_by_css_selector('#backToResultsBtn > button')
            button.click()
        except:
            fail_button = driver.find_element_by_class_name('slds-align-middle.slds-text-heading_x-small.fonteva-slds-hero--heading.slds-truncate')
            fail_button.click()
        time.sleep(3)
        return False
    
    try:
        next_page.click()
        print("From Parse Page info")
        driver.implicitly_wait(10)
        parse_page_info()
    except:
        driver.execute_script("window.scrollTo(0, 0)")
        return False

    # if next_page.is_enabled():
    #     ("NEXT PAGE ENABLED")
    #     next_page.click()
    #     parse_page_info()
    # else:
    #     print('NOT ENABLED')
    #     driver.execute_script("window.scrollTo(0, 0)")
    #     return False
        

def write_files(orgs, people):
    json_orgs = json.dumps(orgs, indent=4)
    json_people = json.dumps(people, indent=4)
    with open("./organizations.json", "w") as outfile:
        outfile.write(json_orgs)
        driver.implicitly_wait(30)

    with open("./people.json", "w") as outfile:
        outfile.write(json_people)

def append_entries(orgs, people):
    json_orgs = json.dumps(orgs, indent=4)
    json_people = json.dumps(people, indent=4)
    with open("./organizations.json", "a") as outfile:
        outfile.write(json_orgs)
        driver.implicitly_wait(30)

    with open("./people.json", "a") as outfile:
        outfile.write(json_people)


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
driver.implicitly_wait(10)
try:
    open_more = driver.find_element_by_xpath('//*[@id="Organization_Type__c"]/div[13]/a')
    open_more.click()
    driver.implicitly_wait(10)
except:
    open_more = driver.find_element_by_class_name("slds-text-body_medium.slds-font-weight--bold.fonteva-slds-text")
    open_more.click()
    driver.implicitly_wait(10)

for x in range(1, 7):
    group_name = f"Group {x}"
    group_title = driver.find_element_by_xpath("//*[contains(text(), '{}')]".format(group_name))
    group_title.click()
    time.sleep(1)

driver.execute_script("window.scrollTo(0, 0)")

# lightning_element = driver.find_element_by_xpath('//*[@id="searchWrapper"]/div[1]/div[4]/div[2]/div/div[2]/div/div/div[2]/div[1]/div/div[2]/div/div[3]/button[1]/lightning-primitive-icon/svg/use')
# lightning_element.click()
time.sleep(3)

current_tiles = driver.find_elements_by_css_selector('#TileListView > div > div > div > div > div') 
pages = int(driver.find_element_by_css_selector('#TileListView > div > div > div > div > div.slds-size--1-of-1.slds-m-top--medium.slds-grid_align-center > div > div:nth-child(4) > span.slds-m-left--x-small.fonteva-slds-text').text)

for p in range(1, pages):
    print("outer loop")
    time.sleep(1)
    current_tiles = driver.find_elements_by_css_selector('#TileListView > div > div > div > div > div')
    try:

        total_org_number = int(driver.find_element_by_css_selector('#fonteva-directories-results--container > div.slds-grid.slds-grid--align-center.slds-text-body_medium.fonteva-slds-text.slds-p-top_small.slds-p-bottom_large > div.slds-p-horizontal--xx-small > strong > span'))
    except:
        total_org_number = int(driver.find_element_by_css_selector('#fonteva-directories-results--container > div.slds-grid.slds-grid--align-center.slds-text-body_medium.fonteva-slds-text.slds-p-top_small.slds-p-bottom_large > div.slds-p-horizontal--xx-small > strong > span').text)
    try:
        current_org_number = int(driver.find_element_by_css_selector('#fonteva-directories-results--container > div.slds-grid.slds-grid--align-center.slds-text-body_medium.fonteva-slds-text.slds-p-top_small.slds-p-bottom_large > div.slds-p-right--xx-small > strong > span'))
    except:
        current_org_number = int(driver.find_element_by_css_selector('#fonteva-directories-results--container > div.slds-grid.slds-grid--align-center.slds-text-body_medium.fonteva-slds-text.slds-p-top_small.slds-p-bottom_large > div.slds-p-right--xx-small > strong > span').text)
    
    print(f"current org number>{current_org_number}, total_org_number>{total_org_number}")

    if current_org_number == total_org_number:
        break   
    else:
        # For production
        for tile in range(len(current_tiles)-1):
        # for testing
        # for tile in range(8,9):
            try:
                 stale_org_number = int(driver.find_element_by_css_selector('#fonteva-directories-results--container > div.slds-grid.slds-grid--align-center.slds-text-body_medium.fonteva-slds-text.slds-p-top_small.slds-p-bottom_large > div.slds-p-right--xx-small > strong > span'))
            except:
                 stale_org_number = int(driver.find_element_by_css_selector('#fonteva-directories-results--container > div.slds-grid.slds-grid--align-center.slds-text-body_medium.fonteva-slds-text.slds-p-top_small.slds-p-bottom_large > div.slds-p-right--xx-small > strong > span').text)
           
            print(f"stale org number>{stale_org_number}")
            # SCROLL PAGES UNTIL PROPER PAGE
            while stale_org_number != current_org_number:
                print(f"stale org number{stale_org_number}, current_org_number{current_org_number}")
                print("recovering current page")
                next_org_page = driver.find_element_by_css_selector("#TileListView > div > div > div > div > div.slds-size--1-of-1.slds-m-top--medium.slds-grid_align-center > div > button.slds-button.slds-button_neutral.slds-m-left--small.slds-align-middle.fonteva-button--icon.slds-p-horizontal--small")
                next_org_page.click()
                time.sleep(3)
                print(driver.find_element_by_css_selector('#fonteva-directories-results--container > div.slds-grid.slds-grid--align-center.slds-text-body_medium.fonteva-slds-text.slds-p-top_small.slds-p-bottom_large > div.slds-p-right--xx-small > strong > span').text)
                try:
                    stale_org_number = int(driver.find_element_by_css_selector('#fonteva-directories-results--container > div.slds-grid.slds-grid--align-center.slds-text-body_medium.fonteva-slds-text.slds-p-top_small.slds-p-bottom_large > div.slds-p-right--xx-small > strong > span').text)
                except:
                    stale_org_number = int(driver.find_element_by_css_selector('#fonteva-directories-results--container > div.slds-grid.slds-grid--align-center.slds-text-body_medium.fonteva-slds-text.slds-p-top_small.slds-p-bottom_large > div.slds-p-right--xx-small > strong > span'))
                # print(driver.find_element_by_css_selector('#fonteva-directories-results--container > div.slds-grid.slds-grid--align-center.slds-text-body_medium.fonteva-slds-text.slds-p-top_small.slds-p-bottom_large > div.slds-p-right--xx-small > strong > span').text)                

            print("inner Loop")
            time.sleep(1)
            loop_tiles = driver.find_elements_by_css_selector('#TileListView > div > div > div > div > div') 
        
            print(f"len(loop_tiles)>{len(loop_tiles)-1}")
            
            print(f"tile>>{tile}")
            loop_tiles[tile].click()
            parse_page_info()
            try:
                button = driver.find_element_by_css_selector('#backToResultsBtn > button')
                button.click()
            except:
                fail_button = driver.find_element_by_class_name('slds-align-middle.slds-text-heading_x-small.fonteva-slds-hero--heading.slds-truncate')
                fail_button.click()
            time.sleep(1)
        next_org_page = driver.find_element_by_css_selector("#TileListView > div > div > div > div > div.slds-size--1-of-1.slds-m-top--medium.slds-grid_align-center > div > button.slds-button.slds-button_neutral.slds-m-left--small.slds-align-middle.fonteva-button--icon.slds-p-horizontal--small")
        next_org_page.click()
        # current_tiles = driver.find_elements_by_css_selector('#TileListView > div > div > div > div > div') 

    # next_org_page = driver.find_element_by_css_selector("#TileListView > div > div > div > div > div.slds-size--1-of-1.slds-m-top--medium.slds-grid_align-center > div > button.slds-button.slds-button_neutral.slds-m-left--small.slds-align-middle.fonteva-button--icon.slds-p-horizontal--small")
    # time.sleep(1)    
    # next_org_page.click()

 
write_files(ORGANIZATIONS, PEOPLE)


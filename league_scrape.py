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

def parse_page_info():
    text_fields = driver.find_element_by_id("fontevaDetailFields")
    text_list = text_fields.text.splitlines()
    org_name = text_list[0]
    org_website = text_list[1]
    org_group = text_list[3]
    org_phone = text_list[4]
    org_address = text_list[5]
    print(org_name, org_website, org_group, org_phone, org_address)

    people = driver.find_elements_by_css_selector('.fonteva-record.slds-table--card.slds-theme--default')
    for p in people:
        children = p.find_elements_by_tag_name("td")
        last_name = children[0].text
        first_name =  children[1].text
        role = children[2].text
        print(last_name, first_name, role)
    
   
    next_page = driver.find_element_by_css_selector("button.slds-button.slds-button_neutral.slds-m-left--small.slds-align-middle.fonteva-button--icon.slds-p-horizontal--small")
    try:
        next_page.click()
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
open_more = driver.find_element_by_xpath('//*[@id="Organization_Type__c"]/div[13]/a')
open_more.click()

for x in range(1, 7):
    group_name = f"Group {x}"

    group_title = driver.find_element_by_xpath("//*[contains(text(), '{}')]".format(group_name))
    group_title.click()

driver.execute_script("window.scrollTo(0, 0)")

# lightning_element = driver.find_element_by_xpath('//*[@id="searchWrapper"]/div[1]/div[4]/div[2]/div/div[2]/div/div/div[2]/div[1]/div/div[2]/div/div[3]/button[1]/lightning-primitive-icon/svg/use')
# lightning_element.click()
time.sleep(3)

current_tiles = driver.find_elements_by_css_selector('#TileListView > div > div > div > div > div') 

for tile in current_tiles:
    tile.click()
    parse_page_info()

    # text_fields = driver.find_element_by_id("fontevaDetailFields")
    # text_list = text_fields.text.splitlines()
    # org_name = text_list[0]
    # org_website = text_list[1]
    # org_group = text_list[3]
    # org_phone = text_list[4]
    # org_address = text_list[5]

    # people = driver.find_elements_by_css_selector('.fonteva-record.slds-table--card.slds-theme--default')
    # for p in people:
    #     children = p.find_elements_by_tag_name("td")
    #     last_name = children[0].text
    #     first_name =  children[1].text
    #     role = children[2].text
    
   
    # next_page = driver.find_element_by_css_selector("button.slds-button.slds-button_neutral.slds-m-left--small.slds-align-middle.fonteva-button--icon.slds-p-horizontal--small")
        
    # if next_page.is_enabled():
    #     next_page.click()
    # else:
    #     pass
    # soup = BeautifulSoup(driver.page_source, 'html.parser')
    # orch_details = soup.find("div", {"id": "fontevaDetailFields"})
    # print(orch_details)
    button = driver.find_element_by_css_selector('#backToResultsBtn > button')
    button.click()


